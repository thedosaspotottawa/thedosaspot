import os
import sys
import json
from sqlalchemy.orm import Session

# Add the parent directory to sys.path to import modules from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, DATA_DIR
from models import CategoryDB, MenuItemDB

def sync_from_json():
    db = SessionLocal()
    menu_file = os.path.join(DATA_DIR, "menu.json")
    
    if not os.path.exists(menu_file):
        print(f"Error: {menu_file} not found")
        return

    try:
        with open(menu_file, "r") as f:
            data = json.load(f)
        
        # 1. Map existing categories for reference
        existing_categories = db.query(CategoryDB).all()
        cat_map = {cat.name: cat for cat in existing_categories}
        
        json_cat_names = [cat["name"] for cat in data.get("categories", [])]
        
        # 2. Remove categories (and their items) not in JSON
        for name, cat in list(cat_map.items()):
            if name not in json_cat_names:
                print(f"Removing category: {name}")
                db.query(MenuItemDB).filter(MenuItemDB.category_id == cat.id).delete()
                db.delete(cat)
                del cat_map[name]
        
        db.commit()

        # 3. Process categories in JSON
        for cat_data in data.get("categories", []):
            cat_name = cat_data["name"]
            if cat_name not in cat_map:
                print(f"Adding category: {cat_name}")
                db_cat = CategoryDB(name=cat_name)
                db.add(db_cat)
                db.commit()
                db.refresh(db_cat)
                cat_map[cat_name] = db_cat
            else:
                db_cat = cat_map[cat_name]

            # Sync items in this category
            json_items = cat_data.get("items", [])
            json_item_names = [item["name"] for item in json_items]
            
            # Remove items not in JSON for this category
            db.query(MenuItemDB).filter(
                MenuItemDB.category_id == db_cat.id,
                ~MenuItemDB.name.in_(json_item_names)
            ).delete(synchronize_session='fetch')
            
            # Update or Add items
            for item in json_items:
                db_item = db.query(MenuItemDB).filter(
                    MenuItemDB.category_id == db_cat.id,
                    MenuItemDB.name == item["name"]
                ).first()
                
                if db_item:
                    # Update
                    db_item.price = item["price"]
                    db_item.description = item["description"]
                    db_item.spicy = item.get("spicy", False)
                    db_item.image_url = item.get("image_url")
                else:
                    # Add
                    print(f"Adding item: {item['name']} to {cat_name}")
                    db_item = MenuItemDB(
                        name=item["name"],
                        price=item["price"],
                        description=item["description"],
                        spicy=item.get("spicy", False),
                        image_url=item.get("image_url"),
                        category_id=db_cat.id
                    )
                    db.add(db_item)
            
        db.commit()
        print("Database sync complete!")
        
    except Exception as e:
        db.rollback()
        print(f"Error during sync: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    sync_from_json()

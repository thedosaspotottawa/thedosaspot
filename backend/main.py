from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal, DATA_DIR
from models import CategoryDB, MenuItemDB, BannerDB
from routers import menu, reservations, banners

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dosa Spot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://thedosaspot.ca",
        "https://www.thedosaspot.ca",
        "https://thedosaspotottawa.github.io",
        "http://localhost:5173",
        "http://localhost:4173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(menu.router)
app.include_router(reservations.router)
app.include_router(banners.router)

@app.get("/")
def read_root():
    return {"message": "Dosa Point API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# --- Seeding ---
def seed_banners(db: Session):
    if db.query(BannerDB).first():
        return
    
    banners_file = os.path.join(DATA_DIR, "banners.json")
    if os.path.exists(banners_file):
        try:
            with open(banners_file, "r") as f:
                data = json.load(f)
            for bdt in data:
                db.add(BannerDB(message=bdt["message"], active=bdt.get("active", True)))
            db.commit()
            print(f"Successfully seeded banners from {banners_file}")
        except Exception as e:
            print(f"Error seeding banners: {e}")
    else:
        # Fallback if file missing
        initial_messages = [
            "website is in progress some functionality may not work",
            "hours may differ due to weather, check store open status before coming"
        ]
        for msg in initial_messages:
            db.add(BannerDB(message=msg, active=True))
        db.commit()

def seed_db():
    db = SessionLocal()
    menu_file = os.path.join(DATA_DIR, "menu.json")
    
    # Check if categories already exist
    if db.query(CategoryDB).first():
        seed_banners(db)
        db.close()
        return

    if os.path.exists(menu_file):
        try:
            with open(menu_file, "r") as f:
                data = json.load(f)
            for cat_data in data.get("categories", []):
                db_cat = CategoryDB(name=cat_data["name"])
                db.add(db_cat)
                db.commit()
                db.refresh(db_cat)
                for item in cat_data.get("items", []):
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
            print(f"Successfully seeded database from {menu_file}")
        except Exception as e:
            print(f"Error seeding database from file: {e}")
    else:
        # Hardcoded fallback seeding
        categories_data = {
            "Signature Dosas": [
                {"name": "Masala Dosa", "price": 10.99, "description": "Crispy rice crepe filled with spiced potato mash.", "spicy": False, "image_url": "/assets/images/masala-dosa.jpg"},
                {"name": "Mysore Masala Dosa", "price": 12.99, "description": "Spicy Mysore chutney spread inside a crisp dosa.", "spicy": True, "image_url": "/assets/images/mysore-dosa.jpg"},
                {"name": "Cheese Chili Dosa", "price": 13.99, "description": "Loaded with melted cheese and fresh green chilies.", "spicy": True, "image_url": "/assets/images/cheese-dosa.jpg"}
            ],
            "Idli & Vada": [
                {"name": "Steamed Idli (2pcs)", "price": 6.99, "description": "Fluffy steamed rice cakes served with sambar and chutney.", "spicy": False, "image_url": "/assets/images/idli.jpg"},
                {"name": "Medhu Vada (2pcs)", "price": 7.99, "description": "Savory fried lentil donuts.", "spicy": False, "image_url": "/assets/images/vada.jpg"}
            ]
        }
        for cat_name, items in categories_data.items():
            db_cat = CategoryDB(name=cat_name)
            db.add(db_cat)
            db.commit()
            db.refresh(db_cat)
            for item_data in items:
                db_item = MenuItemDB(**item_data, category_id=db_cat.id)
                db.add(db_item)
        db.commit()

    seed_banners(db)
    db.close()

@app.on_event("startup")
async def startup_event():
    seed_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

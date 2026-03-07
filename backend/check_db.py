from database import engine, SessionLocal
from models import CategoryDB, MenuItemDB, StoreTimingDB
import sys

def check_db():
    print("Checking database connection...")
    try:
        db = SessionLocal()
        # Check categories
        cats = db.query(CategoryDB).all()
        print(f"Found {len(cats)} categories")
        for cat in cats:
            items = db.query(MenuItemDB).filter(MenuItemDB.category_id == cat.id).count()
            print(f" - {cat.name}: {items} items")
        
        # Check timings
        timings = db.query(StoreTimingDB).all()
        print(f"Found {len(timings)} store timings")
        
        db.close()
        print("Success!")
    except Exception as e:
        print(f"Database error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_db()

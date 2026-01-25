from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import CategoryDB, MenuItemDB
from schemas import MenuData, MenuCategory, CategoryCreate, MenuItem, MenuItemCreate
from auth import verify_admin_token

router = APIRouter(prefix="/menu", tags=["menu"])

@router.get("", response_model=MenuData)
async def get_menu(db: Session = Depends(get_db)):
    categories = db.query(CategoryDB).all()
    return {"categories": categories}

@router.post("/categories", response_model=MenuCategory)
async def create_category(
    cat: CategoryCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_cat = CategoryDB(name=cat.name)
    db.add(db_cat)
    try:
        db.commit()
        db.refresh(db_cat)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="Category already exists")
    return db_cat

@router.put("/categories/{cat_id}", response_model=MenuCategory)
async def update_category(
    cat_id: int, 
    cat: CategoryCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_cat = db.query(CategoryDB).filter(CategoryDB.id == cat_id).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db_cat.name = cat.name
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.delete("/categories/{cat_id}")
async def delete_category(
    cat_id: int, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_cat = db.query(CategoryDB).filter(CategoryDB.id == cat_id).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.query(MenuItemDB).filter(MenuItemDB.category_id == cat_id).delete()
    db.delete(db_cat)
    db.commit()
    return {"message": "Category deleted"}

@router.post("/items", response_model=MenuItem)
async def create_item(
    item: MenuItemCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_item = MenuItemDB(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/items/{item_id}", response_model=MenuItem)
async def update_item(
    item_id: int, 
    item: MenuItemCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_item = db.query(MenuItemDB).filter(MenuItemDB.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db_item.name = item.name
    db_item.price = item.price
    db_item.description = item.description
    db_item.spicy = item.spicy
    db_item.image_url = item.image_url
    db_item.category_id = item.category_id
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/items/{item_id}")
async def delete_item(
    item_id: int, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_item = db.query(MenuItemDB).filter(MenuItemDB.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}

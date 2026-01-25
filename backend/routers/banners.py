from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import BannerDB
from schemas import Banner, BannerCreate
from auth import verify_admin_token

router = APIRouter(prefix="/banners", tags=["banners"])

@router.get("", response_model=List[Banner])
async def get_banners(db: Session = Depends(get_db)):
    return db.query(BannerDB).all()

@router.post("", response_model=Banner)
async def create_banner(
    banner: BannerCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_banner = BannerDB(message=banner.message, active=banner.active)
    db.add(db_banner)
    db.commit()
    db.refresh(db_banner)
    return db_banner

@router.put("/{banner_id}", response_model=Banner)
async def update_banner(
    banner_id: int, 
    banner: BannerCreate, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_banner = db.query(BannerDB).filter(BannerDB.id == banner_id).first()
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    db_banner.message = banner.message
    db_banner.active = banner.active
    db.commit()
    db.refresh(db_banner)
    return db_banner

@router.delete("/{banner_id}")
async def delete_banner(
    banner_id: int, 
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_banner = db.query(BannerDB).filter(BannerDB.id == banner_id).first()
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    db.delete(db_banner)
    db.commit()
    return {"message": "Banner deleted"}

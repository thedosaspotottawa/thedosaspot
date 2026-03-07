from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import StoreTimingDB
from schemas import StoreTiming, StoreTimingCreate
from auth import verify_admin_token
from typing import List

router = APIRouter(prefix="/settings", tags=["settings"])

@router.get("/timings", response_model=List[StoreTiming])
async def get_timings(db: Session = Depends(get_db)):
    return db.query(StoreTimingDB).order_by(StoreTimingDB.prio).all()

@router.post("/timings", response_model=StoreTiming)
async def create_timing(
    timing: StoreTimingCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_timing = StoreTimingDB(**timing.model_dump())
    db.add(db_timing)
    db.commit()
    db.refresh(db_timing)
    return db_timing

@router.put("/timings/{timing_id}", response_model=StoreTiming)
async def update_timing(
    timing_id: int,
    timing: StoreTimingCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_timing = db.query(StoreTimingDB).filter(StoreTimingDB.id == timing_id).first()
    if not db_timing:
        raise HTTPException(status_code=404, detail="Timing not found")
    
    db_timing.day_range = timing.day_range
    db_timing.hours = timing.hours
    db_timing.prio = timing.prio
    db_timing.is_special = timing.is_special
    
    db.commit()
    db.refresh(db_timing)
    return db_timing

@router.delete("/timings/{timing_id}")
async def delete_timing(
    timing_id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)
):
    db_timing = db.query(StoreTimingDB).filter(StoreTimingDB.id == timing_id).first()
    if not db_timing:
        raise HTTPException(status_code=404, detail="Timing not found")
    db.delete(db_timing)
    db.commit()
    return {"message": "Timing deleted"}

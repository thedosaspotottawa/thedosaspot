from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import ReservationDB
from schemas import Reservation, ReservationStatusUpdate
from auth import verify_admin

router = APIRouter(prefix="/reservations", tags=["reservations"])

@router.post("", response_model=Reservation)
async def create_reservation(res: Reservation, db: Session = Depends(get_db)):
    # Create DB object - exclude id if present (it's auto-generated) and status (default pending)
    # We use model_dump(exclude={'id', 'status'}) but we want to allow status if passed? 
    # Actually for creation, we usually ignore passed status and set it to pending.
    res_data = res.model_dump(exclude={'id'})
    # Force default status on create if not provided or override it to be safe
    if 'status' not in res_data or not res_data['status']:
        res_data['status'] = 'pending'
        
    db_res = ReservationDB(**res_data)
    db.add(db_res)
    db.commit()
    db.refresh(db_res)
    return db_res

@router.get("", response_model=List[Reservation])
async def get_reservations(db: Session = Depends(get_db)):
    return db.query(ReservationDB).all()

@router.put("/{reservation_id}", response_model=Reservation)
async def update_reservation_status(
    reservation_id: int, 
    update_data: ReservationStatusUpdate, 
    db: Session = Depends(get_db)
):
    verify_admin(update_data.password)
    
    db_res = db.query(ReservationDB).filter(ReservationDB.id == reservation_id).first()
    if not db_res:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    db_res.status = update_data.status
    db.commit()
    db.refresh(db_res)
    return db_res

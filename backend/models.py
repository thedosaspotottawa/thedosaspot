from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class CategoryDB(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    items = relationship("MenuItemDB", back_populates="category")

class MenuItemDB(Base):
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    description = Column(Text)
    spicy = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("CategoryDB", back_populates="items")

class ReservationDB(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    # Existing fields
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    date = Column(String)
    time = Column(String)
    guests = Column(Integer)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    # New fields for booking types
    booking_type = Column(String, default="table")  # table, private_event, catering
    event_type = Column(String, nullable=True)  # birthday, wedding, corporate, etc.
    duration = Column(String, nullable=True)  # for private events
    special_requests = Column(Text, nullable=True)
    budget = Column(String, nullable=True)  # for catering/private events
    venue = Column(String, nullable=True)  # for catering (client location or restaurant)

class BannerDB(Base):
    __tablename__ = "banners"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

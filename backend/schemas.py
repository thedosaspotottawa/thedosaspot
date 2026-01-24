from pydantic import BaseModel
from typing import List, Optional

class MenuItemBase(BaseModel):
    name: str
    price: float
    description: str
    spicy: Optional[bool] = False
    image_url: Optional[str] = None

class MenuItem(MenuItemBase):
    id: int
    class Config:
        from_attributes = True

class MenuCategoryBase(BaseModel):
    name: str

class MenuCategory(MenuCategoryBase):
    id: int
    items: List[MenuItem]
    class Config:
        from_attributes = True

class MenuData(BaseModel):
    categories: List[MenuCategory]

class MenuItemCreate(MenuItemBase):
    category_id: int
    password: str

class CategoryCreate(MenuCategoryBase):
    password: str

class Reservation(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    status: Optional[str] = "pending"
    class Config:
        from_attributes = True

class ReservationStatusUpdate(BaseModel):
    status: str
    password: str

class BannerBase(BaseModel):
    message: str
    active: Optional[bool] = True

class Banner(BannerBase):
    id: int
    class Config:
        from_attributes = True

class BannerCreate(BannerBase):
    password: str

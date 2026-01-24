from PIL import Image
import os

source_path = '/Users/arpitm/Multiverse/Chaos/PWAs/dosa-point/frontend/public/android-chrome-512x512.png'
dest_path = '/Users/arpitm/Multiverse/Chaos/PWAs/dosa-point/frontend/public/favicon_white.png'

if os.path.exists(source_path):
    img = Image.open(source_path).convert("RGBA")
    
    # Create white background
    white_bg = Image.new("RGBA", img.size, "WHITE")
    
    # Composite
    white_bg.paste(img, (0, 0), img)
    
    # Convert to RGB to remove alpha channel since we want solid white
    final_img = white_bg.convert("RGB")
    
    # Save as PNG
    final_img.save(dest_path, "PNG")
    print(f"Created {dest_path}")
else:
    print(f"Source not found: {source_path}")

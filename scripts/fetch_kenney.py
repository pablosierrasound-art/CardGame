"""Best-effort Kenney CC0 asset installer. Never block the game deployment."""
from pathlib import Path
import urllib.request, zipfile, io
root=Path(__file__).resolve().parents[1]
dest=root/"public"/"kenney"
sheet=dest/"tilemap_packed.png"
if sheet.exists():
    print("Kenney assets already present")
    raise SystemExit(0)
url="https://kenney.nl/media/pages/assets/tiny-dungeon/f8422efb44-1674742415/kenney_tiny-dungeon.zip"
try:
    request=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"})
    with urllib.request.urlopen(request,timeout=15) as response:
        archive=zipfile.ZipFile(io.BytesIO(response.read()))
    name=next((n for n in archive.namelist() if n.endswith("tilemap_packed.png")),None)
    if not name: raise RuntimeError("tilemap_packed.png missing from ZIP")
    dest.mkdir(parents=True,exist_ok=True)
    sheet.write_bytes(archive.read(name))
    print("Installed official Kenney tilesheet")
except Exception as error:
    print("WARNING: Kenney download unavailable; building with bundled pixel art:",error)

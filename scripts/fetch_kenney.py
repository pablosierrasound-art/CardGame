"""Download Kenney Tiny Dungeon (CC0) before dev/build, and cache locally."""
from pathlib import Path
import urllib.request, zipfile, io, shutil
root=Path(__file__).resolve().parents[1]
dest=root/"public"/"kenney"
sheet=dest/"tilemap_packed.png"
if sheet.exists():
    print("Kenney Tiny Dungeon already installed")
    raise SystemExit(0)
url="https://kenney.nl/media/pages/assets/tiny-dungeon/f8422efb44-1674742415/kenney_tiny-dungeon.zip"
print("Downloading Kenney Tiny Dungeon...")
with urllib.request.urlopen(url,timeout=40) as response:
    archive=zipfile.ZipFile(io.BytesIO(response.read()))
dest.mkdir(parents=True,exist_ok=True)
for name in archive.namelist():
    if name.endswith("/tilemap_packed.png") or name=="tilemap_packed.png":
        sheet.write_bytes(archive.read(name))
        break
else:
    raise RuntimeError("Kenney tilesheet not found in archive")
print("Installed",sheet)

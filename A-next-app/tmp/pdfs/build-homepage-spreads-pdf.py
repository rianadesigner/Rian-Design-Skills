from pathlib import Path

from PIL import Image
from reportlab.pdfgen import canvas


ROOT = Path('/Users/rian/Rian-Design-Skills/A-next-app')
SOURCE_DIR = ROOT / 'tmp/pdfs/homepage-spreads'
OUTPUT = ROOT / 'output/pdf/rian-homepage-spreads-1-4.pdf'
SOURCES = [
    SOURCE_DIR / 'spread-1-2.png',
    SOURCE_DIR / 'spread-3-4.png',
]


with Image.open(SOURCES[0]) as image:
    source_width, source_height = image.size

page_width = 1000.0
page_height = page_width * source_height / source_width

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
document = canvas.Canvas(str(OUTPUT), pagesize=(page_width, page_height), pageCompression=1)
document.setTitle('Rian Homepage — Spreads 1–4')
document.setAuthor('Rian')
document.setSubject('Homepage book spreads: pages 1/2 and pages 3/4')

for source in SOURCES:
    document.drawImage(
        str(source),
        0,
        0,
        width=page_width,
        height=page_height,
        preserveAspectRatio=True,
        anchor='c',
        mask='auto',
    )
    document.showPage()

document.save()
print(OUTPUT)

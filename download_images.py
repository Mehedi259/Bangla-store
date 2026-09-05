import os
import requests
from duckduckgo_search import DDGS

queries = {
    "pran_chanachur": "PRAN Chanachur packet",
    "muri": "Puffed Rice Muri bowl",
    "mango_achar": "Mango Achar pickle jar",
    "shutki": "Dried Fish Shutki",
    "kalo_jam": "Kalo Jam sweet Bengali",
    "golap_jamun": "Gulab Jamun sweet Bengali",
    "chomchom": "Chomchom sweet Bengali",
    "roshmalai": "Roshmalai sweet Bengali",
    "mishti_doi": "Mishti Doi clay pot Bengali",
    "pui_shak": "Pui Shak Malabar spinach",
    "lal_shak": "Lal Shak red amaranth fresh",
    "lau": "Bottle Gourd Lau vegetable fresh",
    "kancha_morich": "Green chili Kancha Morich",
    "kancha_kola": "Green banana Kancha Kola raw",
    "kochur_loti": "Kochur Loti taro stolon",
    "bombai_morich": "Naga Morich chili red"
}

output_dir = "public/images"
os.makedirs(output_dir, exist_ok=True)

with DDGS() as ddgs:
    for filename, query in queries.items():
        print(f"Searching for {query}...")
        try:
            results = list(ddgs.images(query, max_results=3))
            downloaded = False
            for res in results:
                image_url = res['image']
                print(f"Trying to download from {image_url}")
                try:
                    response = requests.get(image_url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
                    if response.status_code == 200:
                        with open(f"{output_dir}/{filename}.jpg", 'wb') as handler:
                            handler.write(response.content)
                        print(f"Saved {filename}.jpg")
                        downloaded = True
                        break
                except Exception as e:
                    print(f"Failed: {e}")
            
            if not downloaded:
                print(f"Could not download any image for {query}")
        except Exception as e:
            print(f"Error searching {query}: {e}")

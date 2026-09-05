import os
import requests

queries = {
    "muri": "Puffed_rice",
    "mango_achar": "South_Asian_pickle",
    "shutki": "Dried_fish",
    "kalo_jam": "Gulab_jamun",
    "golap_jamun": "Gulab_jamun",
    "chomchom": "Chomchom",
    "roshmalai": "Ras_malai",
    "mishti_doi": "Mishti_doi",
    "pui_shak": "Basella_alba",
    "lal_shak": "Amaranthus_tricolor",
    "lau": "Calabash",
    "kancha_morich": "Green_chili_pepper",
    "kancha_kola": "Cooking_banana",
    "kochur_loti": "Taro",
    "bombai_morich": "Naga_Morich"
}

output_dir = "public/images"
os.makedirs(output_dir, exist_ok=True)

headers = {
    'User-Agent': 'BanglaStoreBot/1.0 (contact@example.com)'
}

for filename, title in queries.items():
    print(f"Fetching {title}...")
    try:
        # Get page info including main image
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=800"
        res = requests.get(url, headers=headers).json()
        pages = res.get('query', {}).get('pages', {})
        page = list(pages.values())[0]
        
        if 'thumbnail' in page:
            img_url = page['thumbnail']['source']
            print(f"Downloading from {img_url}")
            img_data = requests.get(img_url, headers=headers).content
            with open(f"{output_dir}/{filename}.jpg", 'wb') as handler:
                handler.write(img_data)
            print(f"Saved {filename}.jpg")
        else:
            print(f"No image found for {title}")
    except Exception as e:
        print(f"Error for {title}: {e}")

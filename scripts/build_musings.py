"""Build crawlable reading pages from the existing shared musing templates.

Run from the repository root: python scripts/build_musings.py
Requires lxml. Source article copy remains in musings.html.
"""
import copy
import json
from pathlib import Path
from lxml import html, etree

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://designmythinking.xyz"
routes = json.loads((ROOT / "scripts/musing_routes.json").read_text())
source = html.document_fromstring((ROOT / "musings.html").read_text())
AUTHOR = {"@type": "Person", "name": "Daniel Logan-Gill", "url": ORIGIN + "/about.html"}
PUBLISHER = {"@type": "Organization", "name": "Design My Thinking", "url": ORIGIN + "/"}

def serialize(doc):
    return "<!DOCTYPE html>\n" + html.tostring(doc, encoding="unicode", method="html") + "\n"

def metadata(doc, title, description, url, kind="website", image=None, graph=None):
    head = doc.find("head")
    for el in head.xpath('./link[@rel="canonical"]|./meta[@property]|./meta[@name="twitter:card"]|./script[@type="application/ld+json"]'):
        head.remove(el)
    head.find("title").text = title
    descriptions = head.xpath('./meta[@name="description"]')
    if descriptions:
        descriptions[0].set("content", description)
    else:
        etree.SubElement(head, "meta", name="description", content=description)
    etree.SubElement(head, "link", rel="canonical", href=url)
    for name, value in {"og:type": kind, "og:title": title, "og:description": description,
                        "og:url": url, "og:site_name": "Design My Thinking"}.items():
        etree.SubElement(head, "meta", property=name, content=value)
    if image:
        etree.SubElement(head, "meta", property="og:image", content=image)
    etree.SubElement(head, "meta", name="twitter:card", content="summary_large_image" if image else "summary")
    if graph:
        script = etree.SubElement(head, "script", type="application/ld+json")
        script.text = json.dumps(graph, ensure_ascii=False).replace("<", "\\u003c")

def absolute_links(element):
    for el in element.xpath('.//*[@href]|.//*[@src]'):
        for attr in ("href", "src"):
            value = el.get(attr)
            if value and not value.startswith(("/", "#", "http:", "https:", "mailto:", "data:")):
                el.set(attr, "/" + value)

def nav(doc):
    node = doc.xpath('//*[@id="site-nav"]')[0]
    node.clear()
    node.set("id", "site-nav")
    node.set("class", "site-nav")
    node.set("aria-label", "Primary navigation")
    for label, href in [("Work", "/index.html#glimpses"), ("Approach", "/approach.html"),
                        ("Musings", "/musings/"), ("Prototypes", "/prototypes/"),
                        ("About", "/about.html"), ("Contact", "/contact.html")]:
        a = etree.SubElement(node, "a", href=href)
        a.text = label
        if label == "Musings":
            a.set("aria-current", "page")
    absolute_links(doc)

index = copy.deepcopy(source)
nav(index)
description = index.xpath('//meta[@name="description"]')[0].get("content")
metadata(index, "Workshop Design & Facilitation Musings — Design My Thinking", description,
         ORIGIN + "/musings/", graph={
             "@context": "https://schema.org", "@type": "CollectionPage",
             "name": "Design My Thinking Musings", "url": ORIGIN + "/musings/",
             "description": description, "author": AUTHOR,
             "hasPart": [{"@type": "Article", "headline": r["title"], "url": ORIGIN + "/musings/" + r["slug"] + "/"} for r in routes]
         })
(ROOT / "musings.html").write_text(serialize(index))
(ROOT / "musings").mkdir(exist_ok=True)
(ROOT / "musings/index.html").write_text(serialize(index))

for route in routes:
    doc = etree.Element("html", lang="en")
    doc.append(copy.deepcopy(index.find("head")))
    # A reading page needs only its own image/demo enhancement scripts.
    head = doc.find("head")
    for script in head.xpath('./script[@src]'):
        head.remove(script)
    enhancements = ["script.js"]
    if route["number"] <= 6:
        enhancements.append("musings-transparent-art.js")
    elif route["number"] == 7:
        enhancements += ["musing07-visual-v2.js", "musing07-loop-fix.js", "musing07-image-fix.js"]
    else:
        enhancements.append(f'musing{route["number"]:02d}-image.js')
    for path in enhancements:
        etree.SubElement(head, "script", src="/" + path + "?v=20261014a", defer="defer").text = ""
    body = etree.SubElement(doc, "body", {"class": "musings-page musing-reading-page"})
    header = copy.deepcopy(index.find("body").find("header"))
    body.append(header)
    main = etree.SubElement(body, "main", {"class": "musing-reading-shell", "id": "main-content"})
    crumbs = etree.SubElement(main, "nav", {"class": "musing-breadcrumbs", "aria-label": "Breadcrumb"})
    home = etree.SubElement(crumbs, "a", href="/")
    home.text = "Home"
    home.tail = " / "
    listing = etree.SubElement(crumbs, "a", href="/musings/")
    listing.text = "Musings"
    listing.tail = " / "
    current = etree.SubElement(crumbs, "span", {"aria-current": "page"})
    current.text = route["title"]
    template = source.xpath(f'//template[@id="{route["id"]}"]')[0]
    article = copy.deepcopy(template.find("article"))
    heading = article.xpath('.//*[contains(@class,"field-note-title")]')[0]
    heading.tag = "h1"
    main.append(article)
    author = etree.SubElement(main, "section", {"class": "musing-author", "aria-labelledby": "musing-author-title"})
    etree.SubElement(author, "h2", id="musing-author-title").text = "About the author"
    p = etree.SubElement(author, "p")
    p.text = "Daniel Logan-Gill is a facilitator and workshop designer with more than 15 years' experience across transformation, customer experience and human-centred design. His musings share practical observations, experiments and lessons from helping groups think better together."
    a = etree.SubElement(author, "a", href="/about.html")
    a.text = "More about Daniel →"
    related = etree.SubElement(main, "section", {"class": "musing-related", "aria-labelledby": "musing-related-title"})
    etree.SubElement(related, "h2", id="musing-related-title").text = "Keep thinking"
    ul = etree.SubElement(related, "ul")
    for number in route["related"]:
        item = routes[number-1]
        a = etree.SubElement(etree.SubElement(ul, "li"), "a", href="/musings/" + item["slug"] + "/")
        a.text = item["title"]
    a = etree.SubElement(related, "a", href="/contact.html")
    a.text = "Have a workshop problem to work through? Let's talk →"
    body.append(copy.deepcopy(index.find("body").find("footer")))
    url = ORIGIN + "/musings/" + route["slug"] + "/"
    question = article.xpath('.//p[@class="field-note-question"]')
    lede = "".join(article.xpath('.//p[@class="field-note-lede"]')[0].itertext())
    description = ("".join(question[0].itertext()) + " " + lede) if question else lede
    image = article.xpath('.//div[contains(@class,"field-note-sketch")]//img/@src')
    if route["number"] <= 5:
        image = ["/assets/dmt/" + {
            1: "musings-approved-scenarios.webp", 2: "musings-approved-seed.webp",
            3: "musings-approved-canvas.webp", 4: "musings-approved-wallpaper.webp",
            5: "musing-05-start-big-then-go-deep.webp"
        }[route["number"]]]
    image_url = ORIGIN + image[0].split("?")[0]
    # Make the approved sketch available even when JavaScript is disabled.
    sketch = article.xpath('.//div[contains(@class,"field-note-sketch")]')[0]
    if not sketch.xpath(".//img"):
        etree.SubElement(sketch, "img", src=image[0], alt="", **{"aria-hidden": "true", "decoding": "async"})
    elif route["number"] <= 5:
        sketch.xpath(".//img")[0].set("src", image_url.replace(ORIGIN, ""))
    metadata(doc, route["title"] + " — Design My Thinking", description, url, "article", image_url, {
        "@context": "https://schema.org", "@graph": [
            {"@type": "Article", "headline": route["title"], "description": description,
             "url": url, "mainEntityOfPage": url, "author": AUTHOR,
             "publisher": PUBLISHER, "image": image_url, "inLanguage": "en-AU"},
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN + "/"},
                {"@type": "ListItem", "position": 2, "name": "Musings", "item": ORIGIN + "/musings/"},
                {"@type": "ListItem", "position": 3, "name": route["title"], "item": url}
            ]}
        ]
    })
    nav(doc)
    directory = ROOT / "musings" / route["slug"]
    directory.mkdir(exist_ok=True)
    (directory / "index.html").write_text(serialize(doc))

urls = [ORIGIN + path for path in ["/", "/about.html", "/approach.html", "/contact.html", "/musings/",
        "/prototypes/", "/prototypes/linkedin-conversation-engine/", "/prototypes/podcast/",
        "/prototypes/workshop-designer/", "/principles-lab.html"]]
urls += [ORIGIN + "/musings/" + route["slug"] + "/" for route in routes]
sitemap = etree.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
for url in urls:
    etree.SubElement(etree.SubElement(sitemap, "url"), "loc").text = url
(ROOT / "sitemap.xml").write_bytes(etree.tostring(sitemap, encoding="UTF-8", xml_declaration=True, pretty_print=True))
print(f"Built {len(routes)} complete article pages, the Musings listing and {len(urls)} sitemap URLs.")

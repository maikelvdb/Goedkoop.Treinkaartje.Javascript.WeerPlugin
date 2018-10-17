# Goedkoop-treinkaartje.nl - Weer plugin
Deze Javascript plugin haalt via een GET request de weervoorspellingen op van komende 5 dagen. Deze gevens komen van [openweathermap.org](https://openweathermap.org), om de request te kunnen maken moet je een appid hebben. Deze kan je opvragen via [openweathermap.org/price](https://openweathermap.org/price), ook vind je hier direct de prijzen.

## Hoe werkt het?
De response die wordt ontvangen bevat weervoorspellingen van 5 dagen, per dag zijn er meerdere tijdsstippen beschikbaar. Voor de huidige dag pakken wij de eerste tijd voorspelling die beschikbaar is zodat deze gelijk loopt met de huidige tijd. Alle overige dagen zullen de voorspellingen in het midden van de collectie worden opgepakt. (naar beneden afgerond)

De stijling wordt door de javascript code gekoppeld aan het aangemaakte HTML element, hierdoor hoeven er voor de stijling referenties te worden opgenomen.

## Hoe gebruik ik het?
Deze plugin is makkelijk te gebruiken, hieronder de stappen die moeten worden ondernomen:

### Javascript
```HTML
<script src="{HOSTED_URL}/weather-plugin.js?k={APPID}"></script>
```

Deze tag moet worden opgenomen onderaan de body van pagina's die gebruik moeten maken van de plugin, de {APPID} is de appid van [openweathermap.org](https://openweathermap.org). Verder heeft de javascript jQuery nodig, deze moet boven de plugin worden toegevoegd. De laatste jQuery versie vind je hier: [jquery.com/download/](https://jquery.com/download/).

### HTML
```HTML
<div data-weather-country="nl" data-weather-city="amsterdam"></div>
```

De div heeft 2 attributen die worden gebruikt door de plugin, hierdoor weet de plugin van welke locatie de weervoorspelling moet worden opgehaald. De plugin zal de div vervangen voor de weer gegevens.

### Voorbeeld
![Voorbeeld afbeelding](https://github.com/maikelvdb/Goedkoop.Treinkaartje.Javascript.Weather/blob/master/sample.png?raw=true "Voorbeeld afbeelding")

### Download javascript plugin
[Download hier de weer plugin](https://github.com/maikelvdb/Goedkoop.Treinkaartje.Javascript.Weather/blob/master/src/weather-plugin.js)
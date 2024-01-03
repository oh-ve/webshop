# WEBSHOP

[English below](#english)

###### deutsch

Ein Beispiel für einen einfachen Webshop, der das Einpflegen von Rabattcodes sowie Produkten ermöglicht. Diese Anwendung wurde mithilfe von Node.js und Express im Backend und mit React.js im Frontend erstellt. Sie interagiert mit einer MongoDB-Datenbank für die Speicherung von Rabattcodes und Produktinformationen. Die Kommunikation zwischen Frontend und Backend wird durch RESTful API-Endpunkte ermöglicht.

Diese Anwendung wurde im Rahmen eines Bewerbungsverfahrens erstellt.

## Backend

### Abhängigkeiten

Express
Mongoose
CORS
dotenv

### Umgebungsvariable

Die Konfiguration dieser Anwendung erfolgt über Umgebungsvariablen. Dazu muss eine .env-Datei erstellt werden, die die eigene Verbindungs-URI für die MongoDB-Datenbank enthält.

### Rabattcode-API

Basis-URL (im vorliegenden Beispiel nur lokal): http://localhost:8080/discount

#### Endpunkte

1.  **Generierung und Speicherung von Rabattcodes**
    Endpunkt: POST /

Beispiel-Anfrage:

```json
{
  "code": "NEUER_CODE",
  "expirationDate": "YYYY-MM-DD",
  "discountValue": 10
}
```

Beispiel-Antwort:

```json
{
  "success": true,
  "discount": {
    "_id": "12345",
    "code": "NEUER_CODE",
    "creationDate": "YYYY-MM-DD",
    "expirationDate": "YYYY-MM-DD",
    "discountValue": 10,
    "used": false
  }
}
```

Anmerkung: Das creationDate hat den default-Wert des aktuellen Datums.
used gibt an, ob der Code bereits verwendet wurde und hat den default-Wert false.

2.  **Abrufen und Überprüfen von Rabattcodes**

    Hier werden die Informationen zu einem bestimmten Code abgerufen und dabei überprüft, ob der Code bereits verwendet wurde sowie ob er abgelaufen ist.

    Endpunkt: GET /:code
    URL-Parameter: 'code': Der Code, der Überprüft werden soll.

    Beispiel-Antwort:

        ```json
        {
          "discount": {
            "_id": "12345",
            "code": "NEUER_CODE",
            "expirationDate": "YYYY-MM-DD",
            "discountValue": 10,
            "used": false
          }
        }
        ```

    Beispiel-Antwort (code wurde bereits verwendet / used: true):

        ```json

        {
        "error": "Discount has already been used"
        }

        ```

    Beispiel-Antwort (code ist abgelaufen / expirationDate kleiner als aktuelles Datum):

        ```json

        {
        "error": "Discount has expired"
        }

        ```

3.  **Aktualisieren von Rabattcodes**
    Endpunkt: PUT /:code
    URL-Parameter: 'code': Der Code, der aktualisiert werden soll.

4.  **Abrufen aller Rabattcodes**
    Endpunkt: GET /

5.  **Alle Rabattcodes löschen**
    Endpunkt: DELETE /

6.  **Einzelnen Rabattcode löschen**
    Endpunkt: Delete /:code
    URL-Parameter: 'code': Der Code, der gelöscht werden soll.

### Produkt-API

Basis-URL (im vorliegenden Beispiel nur lokal): http://localhost:8080/items

#### Endpunkte

1. **Alle Produkte abrufen**
   Endpunkt: GET /

2. **Einzelnes Produkt abrufen**
   Endpunkt: GET /:id
   URL-Parameter: 'id': Die automatisch generierte eindeutige id des Items.

3. **Produkt erstellen**
   Endpunkt: POST /

   Beispiel-Anfrage:

   ```json
   {
     "name": "Neues Produkt",
     "brand": "Marke XYZ",
     "price": 29.99,
     "discount": true,
     "limited": false,
     "img": "bild-url.jpg",
     "amount": 100,
     "description": "Beschreibung des Produkts"
   }
   ```

   Beispiel-Antwort:

   ```json
   {
     "success": true,
     "item": {
       "_id": "12345",
       "name": "Neues Produkt",
       "brand": "Marke XYZ",
       "price": 29.99,
       "discount": true,
       "limited": false,
       "img": "bild-url.jpg",
       "amount": 100,
       "description": "Beschreibung des Produkts"
     }
   }
   ```

4. **Alle Produkte löschen**
   Endpunkt: DELETE /

5. **Einzelnes Produkt löschen**
   Endpunkt: DELETE /:id
   URL-Parameter: 'id': Die automatisch generierte eindeutige id des zu löschenden Items.

6. **Produkt aktualisieren**
   Endpunkt: PUT /:id
   URL-Parameter: 'id': Die automatisch generierte eindeutige id des Items.

   Beispiel-Anfrage:

   ```json
   {
     "name": "Neuer Produktname",
     "brand": "Neue Marke",
     "price": 39.99,
     "discount": false,
     "limited": true,
     "img": "neue-bild-url.jpg",
     "amount": 50,
     "description": "Neue Beschreibung"
   }
   ```

   Beispiel-Antwort:

   ```json
   {
     "success": true,
     "item": {
       "_id": "12345",
       "name": "Neuer Produktname",
       "brand": "Neue Marke",
       "price": 39.99,
       "discount": false,
       "limited": true,
       "img": "neue-bild-url.jpg",
       "amount": 50,
       "description": "Neue Beschreibung"
     }
   }
   ```

## Frontend

### Abhängigkeiten

react-router-dom
axios

### Gliederung und Beschreibung

In der Hauptkomponente App.js wird die Struktur der Anwendung definiert und die Unterkomponenten sowie die Routen verwaltet. Die Komponente ItemList.js dient der Darstellung der Produktübersicht, die Komponente ItemDetail.js stellt die Detailseiten dar. Das Styling wird in der Datei App.css festgelegt.

Die Produktübersichts-Seite ist responsiv (Mobile view: 2 Kacheln, Tablet: 3 Kacheln, Desktop: 5 Kacheln). Die Daten zu den Produkten stammen aus der selbst erstellten API (im vorliegenden Beispiel lokal verfügbar) und werden mithilfe von Axios abgerufen. Jede Produktkachel ist klickbar und führt zur Detailansicht des jeweiligen Produkts, auf der alle Informationen zu sehen sind.

### Weitere Anmerkungen

Dies ist eine im Sinne der Aufgabe vereinfachte Darstellung. Im vorliegenden Beispiel habe ich etwa vorausgesetzt, dass alle Produkte um den gleichen Betrag reduziert sind. Eine Möglichkeit, hier mehr Spielraum zu implementieren, wäre zum Beispiel, im Backend im Datenschema zu den einzelnen Produkten ein Feld einzufügen, das besagt, um wieviel Prozent ein Artikel reduziert ist, und dies im Frontend bei der Berechnung des reduzierten Preises und der Darstellung der Prozente zu berücksichtigen.

# Webshop

[Back to German](#deutsch)

###### English

An example of a simple webshop that allows for the integration of discount codes and products. This application was developed using Node.js and Express for the backend and React.js for the frontend. It interacts with a MongoDB database for storing discount codes and product information. The communication between frontend and backend is enabled through RESTful API endpoints.

This application was created as part of a job application process.

## Backend

### Dependencies

Express  
Mongoose  
CORS  
dotenv

### Environment Variables

The configuration of this application is done via environment variables. A .env file must be created that contains the user's own connection URI for the MongoDB database.

### Discount Code API

Base URL (in this example only locally): http://localhost:8080/discount

#### Endpoints

1.  **Generation and Storage of Discount Codes**
    Endpunkt: POST /

        Example request:

        ```json
        {
          "code": "NEW_CODE",
          "expirationDate": "YYYY-MM-DD",
          "discountValue": 10
        }
        ```

    Example response:

```json
{
  "success": true,
  "discount": {
    "_id": "12345",
    "code": "NEW_CODE",
    "creationDate": "YYYY-MM-DD",
    "expirationDate": "YYYY-MM-DD",
    "discountValue": 10,
    "used": false
  }
}
```

Note: The creationDate has the default value of the current date.
"used" indicates whether the code has already been used and has the default value false.

2.  **Reading and Checking Discount Codes**

Here, the information about a specific code is retrieved and checked to see if the code has already been used and whether it has expired.

Endpoint: GET /:code
URL parameter: 'code': The code to be checked.

    Example response:

        ```json
        {
          "discount": {
            "_id": "12345",
            "code": "NEW_CODE",
            "expirationDate": "YYYY-MM-DD",
            "discountValue": 10,
            "used": false
          }
        }
        ```

    Example response (code has already been used / used: true):

        ```json

        {
        "error": "Discount has already been used"
        }

        ```

    Example response (code is expired / expirationDate is less than current date):

        ```json

        {
        "error": "Discount has expired"
        }

        ```

3.  **Updating Discount Codes**
    Endpoint: PUT /:code
    URL parameter: 'code': The code to be updated.

4.  **Retrieving All Discount Codes**
    Endpoint: GET /

5.  **Deleting All Discount Codes**
    Endpoint: DELETE /

6.  **Deleting a Single Discount Code**
    Endpoint: DELETE /:code
    URL parameter: 'code': The code to be deleted.

### Product API

Base URL (in this example only locally): http://localhost:8080/items

#### Endpoints

1. **Retrieve All Products**
   Endpoint: GET /

2. **Retrieve a Single Product**
   Endpoint: GET /:id
   URL parameter: 'id': The automatically generated unique id of the item.

3. **Create Product**
   Endpoint: POST /

Example request:

```json
{
  "name": "New product",
  "brand": "Brand",
  "price": 29.99,
  "discount": true,
  "limited": false,
  "img": "image-url.jpg",
  "amount": 100,
  "description": "Description of the product"
}
```

Example response:

```json
{
  "success": true,
  "item": {
    "_id": "12345",
    "name": "New product",
    "brand": "Brand",
    "price": 29.99,
    "discount": true,
    "limited": false,
    "img": "image-url.jpg",
    "amount": 100,
    "description": "Description of the product"
  }
}
```

4. **Delete All Products**
   Endpoint: DELETE /

5. **Delete a Single Product**
   Endpoint: DELETE /:id
   URL parameter: 'id': The automatically generated unique id of the item to be deleted.

6. **Update Product**
   Endpoint: PUT /:id
   URL parameter: 'id': The automatically generated unique id of the item.

Example request:

```json
{
  "name": "New Product Name",
  "brand": "New Brand",
  "price": 39.99,
  "discount": false,
  "limited": true,
  "img": "new-image-url.jpg",
  "amount": 50,
  "description": "New description"
}
```

Example response:

```json
{
  "success": true,
  "item": {
    "_id": "12345",
    "name": "New Product Name",
    "brand": "New Brand",
    "price": 39.99,
    "discount": false,
    "limited": true,
    "img": "new-image-url.jpg",
    "amount": 50,
    "description": "New description"
  }
}
```

## Frontend

### Dependencies

react-router-dom  
axios

### Structure and Description

In the main component App.js, the structure of the application is defined, and the subcomponents and routes are managed. The ItemList.js component serves to display the product overview, while the ItemDetail.js component presents the detail pages. The styling is set in the App.css file.

The product overview page is responsive (Mobile view: 2 tiles, Tablet: 3 tiles, Desktop: 5 tiles). The data for the products comes from the self-created API (locally available in this example) and is retrieved using Axios. Each product tile is clickable and leads to the detailed view of the respective product, where all information is visible.

### Additional Notes

This is a simplified representation for the sake of the task. In this example, for instance, I have assumed that all products are reduced by the same amount. One way to implement more flexibility here would be, for example, to insert a field in the backend data schema for each product that indicates by what percentage an item is reduced, and to take this into account in the frontend when calculating the reduced price and displaying the percentages.

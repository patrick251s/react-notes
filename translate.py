import json
from flask import Flask, request
from flask_cors import CORS
import requests
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/getTranslation', methods = ["GET"])
def getTranslation():
    text = request.args.get('text')
    language = request.args.get("language")
    print(text)
    print(language)
    
    url = 'https://api-free.deepl.com/v2/translate'
    headers = {
        'Authorization': 'DeepL-Auth-Key 1dca9b72-536d-cb6c-2ea7-96ee5a4a01ef:fx',
        'User-Agent': 'YourApp/1.2.3',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'text': text,
        'target_lang': language
    }

    response = requests.post(url, headers=headers, data=data)
    response_data = response.json()
    print(response_data)
    return json.dumps(response_data["translations"][0]["text"])
 
@app.route('/saveNote', methods = ["POST"])  
def saveNote():
    data = json.loads(request.data)
    polishText = data["polishText"]
    foreignText = data["foreignText"]
    languageShort = data["short"]
    print(polishText)
    print(foreignText)
    print(languageShort)
    connection = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "",
        database = "translate"
    )
    try:
        cursor = connection.cursor()
        query = "SELECT id_language FROM language WHERE language_short = %s"
        cursor.execute(query, (languageShort, ))
        rows = cursor.fetchall()
        idLanguage = None
        for row in rows:
            idLanguage = row[0]
            break
        cursor.execute("INSERT INTO note VALUES (%s, %s, %s, %s)", (None, polishText, foreignText, idLanguage))
        connection.commit()
        cursor.close()
        connection.close()
        return "200"
    except mysql.connector.Error as error:
        connection.rollback()
        cursor.close()
        connection.close()
        return "400"
    
@app.route("/getNotes/<languageShort>", methods=["GET"])
def getNotes(languageShort):
    connection = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "",
        database = "translate"
    )
    try:
        cursor = connection.cursor()
        query = "SELECT n.id_note, n.polish_text, n.foreign_text FROM note n INNER JOIN language lan ON n.language_id = lan.id_language WHERE language_short = %s"
        cursor.execute(query, (languageShort, ))
        rows = cursor.fetchall()
        return json.dumps(rows)
    except mysql.connector.Error as error:
        connection.rollback()
        cursor.close()
        connection.close()
        return json.dumps([])

    
app.run()
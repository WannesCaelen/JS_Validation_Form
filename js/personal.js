    // Lege array van errors. Deze gebruiken we over heel het document om errors in op te vangen en errors toe te voegen.
    let Errors = []

    function ValidateForm() 
    {
       
        Errors = []
        // We roepen in het begin van deze function de lege array van errors op omdat we de pagina willen beginnen met 0 errors.
        LeegVeldChecken("Naam", "Vul naam in aub ")
        LeegVeldChecken("Voornaam", "Vul voornaam in aub")
    
        // We roepen de functie LeegVeldChecken op om er voor te zorgen dat er in deze velden iets word gezet.
        let WoonplaatsValue = document.getElementById("Woonplaats").value
        // Gebruik van dom om ervoor te zorgen dat we met Woonplaats kunnen omgaan.
        if (WoonplaatsValue === "0") {
        // Als de value van de woonplaats is 0 dan vraagt hij om een woonplaats in te vullen.
            LeegVeldChecken("Woonplaats", "Vul woonplaats in aub", "0")
        }
        else
        {
            EuRegioLanden("Voorlopig kunnen enkel boeken geregistreerd worden in de EU.")
        // Oproep methode voor validatie eu land.
        // Als er wel iets geselecteerd is komen we hier. validatie EU / Niet EU.
        }
    
    
        LeegVeldChecken("GeboorteDatum", "Vul geboortedatum in aub")
        LeegVeldChecken("EMail", "Vul e-mail in aub ")
        LeegVeldChecken("Titel", "Vul titel in aub")
        LeegVeldChecken("Onderwerp", "Vul onderwerp in aub", "0")
        // We roepen de functie LeegVeldChecken op om er voor te zorgen dat er in deze velden iets word gezet.
    
    
        let ExtentieValue = document.getElementById("Upload").value
         // Gebruik van dom om ervoor te zorgen dat we met Upload kunnen omgaan.
    
        if (!CheckExtentie(ExtentieValue,"De file die je hebt meegegeven is niet van het type .docx of .pdf.")) 
        // Als er de verkeerde waarde mee word gegeven dan komen we bij deze error ^^ .
        {
            LeegVeldChecken("Upload", "Geef een bestand mee")
        // Als er niets word ingegeven geeft het de error voor een bestand mee te geven.
        }
    
        checkPaginas("Je boek heeft niet voldoende pagina's om in aanmerking te komen voor een betaalde deal.")
        // Oproepen functie checkPaginas om er voor te zorgen dat het aantal pagina's voldoende is voor een betaalde deal.
    
        checkRijksregisterNummer("Het rijksregisternummer is niet correct.")
    
        // Oproep functie en gepaste foutmelding voor het rijksregisternummer.
        
        ToonSamenvatting()
        // Bij succes word in deze functie de samenvatting getoont.
    
        if (Errors.length > 0) 
        {
        // Als er meer als 0 errors zijn dan komen we in deze loop. 
            let ErrorText = document.getElementById("ErrorP")
        // Gebruik van dom om ervoor te zorgen dat we met ErrorP kunnen omgaan.
            ErrorText.innerHTML = Errors.join("<br>") 
        // Zorgen dat de errors telkens op een nieuwe lijn beginnen.
            OnZichtBaarMaken("SuccesAlert")
            OnZichtBaarMaken("SamenvattingAlert")
            ZichtBaarMaken("ErrorsAlert")
        // Als er meer als 0 errors zijn dan worden hier de bepaalde alerts (on)zichtbaar gemaakt.
        }
        else
        {
            OnZichtBaarMaken("ErrorsAlert")
            ZichtBaarMaken("SuccesAlert")
            ZichtBaarMaken("SamenvattingAlert")
        // Als er minder als 0 errors zijn dan worden hier de bepaalde alerts (on)zichtbaar gemaakt.
        }
    }
    
    function LeegVeldChecken(name, message, defaultValue = "")
    {
        // Functie voor lege velden te checken met parameeters (name, message en defaultvalue) defaultvalue gebruiken we bij onderwerp en woonplaats.
    
        let OpgehaaldeID = document.getElementById(name)
        // Gebruik van dom om ervoor te zorgen dat we met name kunnen omgaan.
    
        if (OpgehaaldeID.value == defaultValue) 
        {
            Errors.push(message)
        }
        // In de validateform functie opgeroepen voor de errors weer te geven.
    }
    
    function ZichtBaarMaken(id)
    {
        let Zichtbaar = document.getElementById(id)
        Zichtbaar.style.display = "block"
        // In de validateform functie opgeroepen voor de alerts zichtbaar te maken.
    
    }
    
    function OnZichtBaarMaken(id)
    {
        let Onzichtbaar = document.getElementById(id)
        Onzichtbaar.style.display = "none"
    
        // In de validateform functie opgeroepen voor de alerts onzichtbaar te maken.
    }
    
    function Init() 
    {
        let RegistreerBtn = document.getElementById("RegistreerBtn")
        // Gebruik van dom om ervoor te zorgen dat we met RegistreerBtn kunnen omgaan.
    
        let ToevoegenBtn = document.getElementById("ToevoegenBtn")
        // Gebruik van dom om ervoor te zorgen dat we met ToevoegenBtn kunnen omgaan.
    
        RegistreerBtn.addEventListener("click", ValidateForm)
        ToevoegenBtn.addEventListener("click", ToevoegenBtnClicked)
    
        // Maakt eventListeners voor de knoppen (Registreren en Onderwerpen Toevoegen).
    
        OnZichtBaarMaken("SuccesAlert")
        OnZichtBaarMaken("ErrorsAlert")
        OnZichtBaarMaken("SamenvattingAlert")
    
        // Zorgt dat op restart alle alerts onzichtbaar gezet worden.
        VulLanden()
    
        // Op start vullen we alle landen op met de functie Vullanden. deze vult de woonplaats met alle landen. 
    }
    
    function ToevoegenBtnClicked() 
    {
        let Option ;
        let Onderwerp = document.getElementById("Onderwerp")
        // Gebruik van dom om ervoor te zorgen dat we met Onderwerp kunnen omgaan.
    
        Option = document.createElement('option')
        // Zorgt ervoor dat we het element option toevoegen.
    
        Option.textContent = prompt("Geef een optie!")
        // Zorgt ervoor dat we een prompt krijgen voor een optie toe te voegen.
    
        Option.value = Onderwerp.length 
        
        // Onderwerp.lastChild.value  gebruik ik hier nu niet, omdat ik anders niet goed weet hoe ik de counter kan doen werken voor de onderwerpen een nummer te geven. Hopelijk is dit ook in orde.
    
        Onderwerp.appendChild(Option);
        // Voegt de optie toe.
        // Zorgt ervoor dat we ook de values met 1 omhoog doen gaan. bv 0-3 staan hard coded met 'Kies een onderwerp' , 'Javascript' , 'DataBases', 'Programming'. 
        // Het geen dat we toevoegen is dan de laatste value +1.
    }
    
    function VulLanden() 
    {
      let Option;
      let Select = document.getElementById("Woonplaats")
        // Gebruik van dom om ervoor te zorgen dat we met Woonplaats kunnen omgaan.
    
      let LandenArray = getAllCountries() 
        // Zorgt ervoor dat we een variabele aanmaken die gelijk gesteld word aan de methode in countries.js.
        LandenArray.forEach(land => {
            Option = document.createElement('option')
            
            Option.textContent = land.name
    
            Option.value = land.code
    
            Select.appendChild(Option);
        });
        // Blijft loopen op elk land en voegt deze toe bij de optie. 
    }
    
    function GetAllEuCountries() 
    {
        // We beginnen de functie door alle landen op te halen.
      var AlleLanden = getAllCountries()
    
        // We maken een nieuwe array aan om de eu landen in op te slagen.
      var EuLanden = []
    
        // We loopen met de for lus door alle landen om hierdoor uiteindelijk de eu lanen uit te kunnen filteren.
      for (var i = 0; i < AlleLanden.length; i++) 
      {
        var Land = AlleLanden[i];
        // Controleer of de region van het land overeenkomt met EU.
       if (Land.region === "EU")
       {
        // Voegt het land toe aan de lijst van eu landen.
        EuLanden.push(Land)
       }
      }
        // Returned alle eu landen.
      return EuLanden;
        // Als het geen euLand is dan geven we uiteindelijk een error message mee. dit gebeurd in de functie EuRegioLanden.
    }
    
    function EuRegioLanden(message) {
        let Select = document.getElementById("Woonplaats");
        // Gebruik van dom om ervoor te zorgen dat we met Woonplaats kunnen omgaan.
            let GeselecteerdeCode = Select.value;
        // Zorgen dat de GeselecteerdeCode gelijk is aan de select value.
            let AlleLanden = getAllCountries();
        // We halen alleLanden op uit de countries.js.
            let IsEuCountry = false;
        // Maken een bool waarbij dat EuCountry default false is.
    
            for (let i = 0; i < AlleLanden.length; i++) {
        // Start te loopen over alle landen.
                if (AlleLanden[i].code === GeselecteerdeCode) {
        // Kijkt of de geselecteerdecode klopt.
                    if (AlleLanden[i].region === "EU") {
        // Kijkt of het land in de regio in eu zit.
                        IsEuCountry = true;
                        break; 
        // Stop de loop zodra een match is gevonden.
                    }
                }
            }
            if (!IsEuCountry) {
                Errors.push(message)
        // Laat de message zien als het land niet in de eu bevind.
            }
    }
    
    function checkPaginas(message) {
        let Checkbox = document.getElementById("free-work")
        // Gebruik van dom om ervoor te zorgen dat we met free-work kunnen omgaan.
        let AantalPaginas = parseInt(document.getElementById("AantalPaginas").value)
        // We zorgen ervoor dat het aantal pagina's zeker een int is.
    
        if (Checkbox.checked)
        {
            return true
        // Als de checkbox aangetikt is dan moeten we geen error toevoegen.
        }
        else if (AantalPaginas < 50) 
        {
         Errors.push(message)   
         // Als de checkbox niet aangetikt is dan moet er wel een error worden toegevoegd indien aantalpagina's < 50.
         return false;
        }
    
    }
    
    function checkRijksregisterNummer(message) {
        let RijksregisterNummer = document.getElementById("RijksregisterNummer").value.trim()
        // Gebruik van dom om ervoor te zorgen dat we met RijksregisterNummer kunnen omgaan.
        // Zorgen ervoor dat het rijksregisternummer getrimmed word. Dit wil zeggen kijken dat er ook geen extra spaties in zitten.
        let GeboorteDatum = document.getElementById("GeboorteDatum").value
        // Gebruik van dom om ervoor te zorgen dat we met GeboorteDatum kunnen omgaan.
        if (RijksregisterNummer === "") 
        {
            return;
        // Als rijksregisternummer leeg is dan validatie ok.
        }
    
        let RijksregisterNummerTotaal6 = RijksregisterNummer.substring(0,6)
        // Zorgt ervoor dat het de eerste 6 cijfers van het rijksregisternummer ophaalt.
        
        
        let RijksregisterNummerJaar = RijksregisterNummerTotaal6.substring(0,2)
        let RijksregisterNummerMaand = RijksregisterNummerTotaal6.substring(2,4)
        let RijksregisterNummerDag = RijksregisterNummerTotaal6.substring(4,6)
        
        // Splits de eerste 2 cijfers voor het jaar, de volgende 2 voor de maand en de laatste 2 voor de dag.
        // Voorbeeld van een datum: 2024-03-04.
        let GeboorteDatumjaar = GeboorteDatum.substring(2,4)
        // In mijn Voorbeeld zou hij dan checken op start met 24.
        let GeboorteDatummaand = GeboorteDatum.substring(5,7)
        // In mijn Voorbeeld zou hij dan checken op middelste met 03.
        let GeboorteDatumdag = GeboorteDatum.substring(8,10)
        // In mijn Voorbeeld zou hij dan checken op einde met 04.
    
        // Haalt de cijfers op voor het jaar, de maand en de dag van de geboortedatum.
    
        if (RijksregisterNummerDag !== GeboorteDatumdag)
        {
        // Als de GeboorteDag !== aan het RijksregisterNummerDag pushed hij een error. 
            Errors.push(message)   
        }
        else if (RijksregisterNummerMaand !== GeboorteDatummaand) {
            Errors.push(message)   
        // Als de GeboorteDag !== aan het RijksregisterNummerDag pushed hij een error.
        }
        else if (RijksregisterNummerJaar !== GeboorteDatumjaar) {
            Errors.push(message)
        // Als de GeboorteDag !== aan het RijksregisterNummerDag pushed hij een error.   
        }
        else if (RijksregisterNummer.length !== 11)
        {
            Errors.push(message)
        // Als het rijksregisternummer niet de lengte van 11 is pushed error.
        }
    
        //Informatie gehaald bij https://www.w3schools.com/jsref/jsref_substring.asp.
    }
    
    
    function CheckExtentie(fileName, message) {
        let Ext = fileName.substring(fileName.lastIndexOf('.') + 1)
        // Hier halen we de extensie van de bestandsnaam op. Door te zoeken op naar de laatste . in de bestandsnaam.
        // Hierna zorgen we ervoor dat de substring begint bij het punt en eindigt op het einde van de bestandsnaam.
        let AmountOfFiles = document.getElementById("Upload").files.length
        // .files geeft een lijst terug van de bestanden in het input veld van Upload.
        // .length geeft het aantal van die lijst terug. 
        if (Ext === "docx" || Ext === "pdf") {
            return true
        // Als het bestand eindigd op docx of pdf dan returnen we een true. Deze zorgt bovenaan bij de errorlist dat er geen error word toegevoegd.
        }
        else if (AmountOfFiles > 0){
            Errors.push(message)
        // Als het er niet op eindigd kijken we eerst of er een input is, als dit niet is dan sturen we een error message.
            return false
        }
        
        // Heb informatie voor deze functie gehaald bij:
        // https://stackoverflow.com/questions/8231058/file-type-validation-with-javascript
    }
    
    function ToggleBetaalMethodes()
    {
        let Checkbox = document.getElementById("free-work");
        // Gebruik van dom om ervoor te zorgen dat we met free-work kunnen omgaan.
        let PaymentOpties = document.getElementById("payment-options")
        // Gebruik van dom om ervoor te zorgen dat we met payment-options kunnen omgaan.
        let Label = document.querySelector('label[for="free-work"]')
         // Gebruik van querySelector om ervoor te zorgen dat we met het label van free-work kunnen omgaan.
         // Dit doen we door free-work een for waarde mee te geven.
        if (Checkbox.checked) 
        {
            PaymentOpties.style.display = "none";
            Label.textContent = "Ik stel mijn werk gratis ter beschikking. (Waarvoor hartelijk dank! Gratis onderwijs is belangrijk zodat iedereen de kans heeft op een mooie en goedbetaalde job.)";
        }
        // Zorgt ervoor dat als de checkbox aangevingt is het de succes display geeft voor gratis werk.
        else 
        {
            PaymentOpties.style.display ="block";
            Label.textContent = "Ik stel mijn werk gratis ter beschikking."
        // Zorgt ervoor dat als de checkbox uitgevingt is het de succes display geeft voor betaald werk.
        // Dit zorgt er ook nog steeds voor dat er een tekstje staat en een checkbox. 
        }
    }
    
    // Dit vond ik best lastig, vooral het id en value gedeelte :p. 
    function MaakSamenvatting() 
    {
        let Samenvatting = []
        // Maakt een lege samenvatting.
        let FormControles = document.querySelectorAll('.form-control');
        // Zorgt ervoor dat we een querySelectorAll gebruiken op ('.form-control').
        // Dit zorgt ervoor dat we de waardes kunnen tonen waar in het html document de class="form-control" staat.
    
        // Loop door elke formControle.
        for (let i = 0; i < FormControles.length; i++) {
        // Haal het element op en stel dit gelijk aan formControles[i].
            let Controle = FormControles[i]
        // Controleer of het element niet leeg is na het verwijderen van eventuele spaties. (Daarom gebruik ik trim()).
            if (Controle.value.trim() !== '')
        // Als het niet leeg is ga dan verder.     
            {
                Samenvatting.push(`${Controle.id}: ${Controle.value}`);
        // Als de waarde niet leeg is dan pushen we dit in de samenvatting array.
        // De samenvatting bestaat uit de id en de waarde van het formcontroles element.
            }
        }
        return Samenvatting.join(', ');
        // Maakt de samenvatting en split deze met een , en een spatie.
    }
    
    function ToonSamenvatting() 
    {
        let SamenvattingAlert = document.getElementById('SamenvattingAlert');
        // Gebruik van dom om ervoor te zorgen dat we het SamenvattingAlert kunnen gebruiken.
        let SamenvattingText = document.querySelector('#SamenvattingAlert p');
        // Gebruik van de querySelector om ervoor te zorgen dat we de 'P tag' van het SamenvattingAlert kunnen gebruiken.
        let Samenvatting = MaakSamenvatting();
        // We maken een variabele aan die de Functie MaakSamenvatting gebruikt.
    
        if (Samenvatting !== '') 
        {
        // Als de samenvatting niet leeg is dan vangen we de text hiervan op in de samenvattingText.textContent.
            SamenvattingText.textContent = Samenvatting;
            SamenvattingAlert.style.display = 'block';
        // En op het einde displayen we deze dan ook.
        } 
        else 
        {
            SamenvattingAlert.style.display = 'none';
        // Als de samenvatting leeg is dan displayen we deze niet.
        }
    }
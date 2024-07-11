
document.addEventListener("DOMContentLoaded", (e)=>{

    class Alien{
        constructor(type, name, lives, weapons){
            //a sx il nome della proprietà, a dx il valore che viene assunto
            this.type = type; //il valore iniziale della prop. type
            this.name = name;// il valore iniziale della prop. name
            this.lives = lives; // il valore iniziale della prop. lives
            this.weapons = weapons; //array delle armi , valore iniziale

        }
    
        //leggo il valore della proprietà lives
        getLives(){
            return this.lives
        }

        //per aggiungere una vita
        increaseLives(){
            this.lives++
        }

        //per diminuire di uno il numero di vite
        decreaseLives() {
            if(this.lives>=1){ //se le vite sono + di una, decremento
                this.lives-- 
            }else{ //in tutti gli altri casi lo riportiamo a zero
                this.lives=0
                this.msg="Hai finito le vite a disposizione. L'alieno è morto"
            }  
        }

        //aggiungi arma, riceve un generico parametro weapons e lo aggiunge all'array delle armi
        addWeapon(weapon){        
            this.weapons.push(weapon)
        }

     

        removeWeapon(weapon){ //rimuove l'arma appena aggiunta dll'array delle armi
            this.weapons.pop(weapon)
        }

        //rimuove 1 arma a partire dalla posizione position
        removeWeaponByPosition(position){
            this.weapons.splice(position,1)
        }

        //rimuove un'arma specificata tramite il nome (Es: rimuovo AK47)
        removeWeaponByName(name){
            //usare .filter()
            console.log("Cancello ..." + name)
            console.log(this.weapons)

/*
La funzione filter per gli array scansiona tutto l'array prendendo un elemento per volta. Effettua per ogni elemento un controllo tramite una espressione booleana (restituisce vero o falso). 
Se l'espressione è vera copia l'elemento in un nuovo array (in questo caso uso lo stesso array e ci riscrivo sopra)

se l'espressione è falsa NON copia l'elemento nel nuovo array quindi lo cancella

['ak47', 'arco', 'barrett']  - Voglio cancellare 'barrett'

estraggo ak47: è diverso da barrett? SI => Lo copio
estraggo arco: è diverso da barrrtt? SI  => Lo copio
estraggo barrett: è diverso da barrett? NO => NON lo copio

*/



this.weapons = this.weapons.filter(
                element => element!==name
            )
            console.log(this.weapons)
            return this.weapons

        }

        /*
        proprietà public e private - Ambito di visibilità delle proprietà (sono 4: public, private, protected e static)
        
        - public vuol dire che è possibile accedere alla proprietà sia da dentro che da fuori della classe

        - private vuol dire che è possibile accedervi SOLO DA DENTRO la classe, FUORI NO
        */

        #gruppo_sanguigno = "abcd"
        #eta = 30

        getEta() {

            if(this.#eta<18){return "L'alieno è minorenne"}
            else{return "L'alieno è maggiorenne"}

        }

        getGruppoSanguigno() {
            if(this.#gruppo_sanguigno=="xyzk"){
                return "L'alieno ha un gruppo universale: può donare a tutti e ricevere da tutti"
            } else if(this.#gruppo_sanguigno=="abcd"){
                return "L'alieno può donare a tutti meno che a quelli del gruppo efgh"
            }
        }

        //incapsulamento: usare un metodo public per accedere ad una proprietà privata
        setGruppoSanguigno(value){
            this.#gruppo_sanguigno = value
        }

        //nuovo metodo da chiamare al caricamento della pagina per mostrare a video le proprietà generali

        refreshPanel(obj){ //obj rappresenta l'oggetto istanziato
            let str= `
                <h3>Ciao mi chiamo ${obj.name} e vengo da ${obj.type}</h3>
                <h5>Ecco le mie caratteristiche</h5>
                <ul>
            `
            //ciclo sulle proprietà dell'oggetto

            for(let prop in obj){       
                if(prop !="weapons"){
                    str+=`
                        <li>
                            ${prop}: ${obj[prop]}
                        </li>
                    `
                }   
            }
            str+=`</ul>`
            return str
        }

        //drawWeapons: rappresenta le armi dell'alieno 

        drawWeapons(obj){ //obj rappresenta l'oggetto istanziato
            let strWeapons = "<h5>Queste sono le mie armi</h5>";
            //facciamo un ciclo sull'array delle armi - obj.weapons

            for(let i=0; i<obj.weapons.length; i++) {
                strWeapons +=`
                    <div style = "display:inline-block">
                        <img src="img/${obj.weapons[i]}.jpg">
                        <h6>${obj.weapons[i]}</h6>
                        <a href="javascript:void(0)"><i class="fa fa-trash" id="${obj.weapons[i]}"></i></a>
                    </div>
                        `

            }
            return strWeapons 
        }


    }//fine class 

    //istanziamo il primo oggetto di classe Alien
    let alien1 = new Alien("Marte", "Pippo", 10, ['Laser Beam', 'AK47', 'lanciarazzi'])
    console.log(alien1)
    //console.log(alien1.#gruppo_sanguigno) //NO
    //alien1.#gruppo_sanguigno = "xyzk" //NO

    const panel = document.getElementById("panel")
    panel.innerHTML = alien1.refreshPanel(alien1)

  
    const images = document.querySelectorAll(".images")

    const panelArmi = document.getElementById('panelArmi')
    panelArmi.innerHTML = alien1.drawWeapons(alien1) // qui come valore del metodo usiamo alien1 perchè la definizione del metodo drawWeapons prevede un parametro obj => l'oggetto istanziato

    panelArmi.addEventListener("click", (e) => {
        console.log(e.target.id) //l'id dell'elemento che ho cliccato
        //debbo cancellare l'arma il cui nome = all'id del'elemento cliccato

        //se il nome dell'arma è presente nell'array allora cancella. Uso la funzione includes() degli array
        if(alien1.weapons.includes(e.target.id)){
            //cancella dall'array elemento che si chiama e.target.id
            if(confirm('Sei sicuro?')){
                alien1.removeWeaponByName(e.target.id)
                panelArmi.innerHTML = alien1.drawWeapons(alien1)
                console.log(alien1)
            }
 
        }
      

    })
   // Aggiungi un listener di eventi "click" a ciascun elemento nell'array "images"
for(let i = 0 ; i < images.length ; i++) {    
    images[i].addEventListener("click", (e) => {
        console.log(alien1); // Stampare l'oggetto alien1 nella console
        // Verifica se l'arma associata all'elemento cliccato non è già inclusa nell'array delle armi di alien1
        if(!alien1.weapons.includes(e.target.name)) {
            console.log(e.target.name); // Stampare il nome dell'arma nell'elemento cliccato nella console
            // Aggiungi l'arma all'array delle armi di alien1
            alien1.addWeapon(e.target.name);
            // Aggiorna il contenuto dell'elemento HTML "panelArmi" con le armi attuali dell'alieno alien1
            panelArmi.innerHTML = alien1.drawWeapons(alien1);
        } else {
            // Se l'arma è già presente, mostra un avviso all'utente
            alert("hai già questa arma");
        }
    });
}

  // Aggiungi l'evento dragstart agli elementi images
for(let i = 0; i < images.length; i++) {
    images[i].addEventListener("dragstart", (e) => {
        // Imposta il tipo di dati da trasferire e i dati stessi
        e.dataTransfer.setData('text/plain', e.target.name);
    });
}

// Aggiungi l'evento dragover all'area di rilascio per consentire il rilascio
panelArmi.addEventListener('dragover', (e) => {
    e.preventDefault(); // Evita il comportamento predefinito di non accettare il rilascio
});

// Aggiungi l'evento drop all'area di rilascio per gestire il rilascio
panelArmi.addEventListener('drop', (e) => {
    e.preventDefault();
    const weaponName = e.dataTransfer.getData('text/plain');

    // Verifica se l'arma è già presente
    if (!alien1.weapons.includes(weaponName)) {
        alien1.addWeapon(weaponName); // Aggiungi l'arma
        panelArmi.innerHTML = alien1.drawWeapons(alien1); // Aggiorna il pannello delle armi
    } else {
        alert("Hai già questa arma.");
    }
});


   

    



})//DOMContentLoaded





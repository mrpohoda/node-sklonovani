//mongodb://heroku_app11305144:hh96vhejc94tebhfkplj5ajeuu@dbh15.mongolab.com:27157/heroku_app11305144

//var Sklonovani = require('../models/sklonovani.js');

//
//  Databaze vzoruu pro sklonovani
//
var vzor = new Array(),
	nvz = 0,
	zivotne = false, // da se nastavit v url
	isDbgMode = 0;

exports.findOne = function (req, res) {
	var slovo = req.params.id,
		zivotne,
		result = [];

	// chceme zivotne sklonovani? v url jako zivotne=1
	if (req.query.zivotne === '1') {
		zivotne = true;
	} else {
		zivotne = false;
	}
	console.log('Slovo: ' + slovo, ', zivotne:', zivotne);

	result.push(vysklonuj(slovo, zivotne));

	console.log(result.rod);
	res.json(result);
	// res.render('list', {
	// 	words: [result]
	// });
};

function vysklonuj(slovo, zivotne) {
	var aTxt, i, j, str, result;

	aTxt = TxtSplit(slovo);
	result = {
		rod: '',
		p1j: '',
		p2j: '',
		p3j: '',
		p4j: '',
		p5j: '',
		p6j: '',
		p7j: '',
		p1m: '',
		p2m: '',
		p3m: '',
		p4m: '',
		p5m: '',
		p6m: '',
		p7m: ''
	};

	PrefRod = "0";
	for (i = aTxt.length - 1; i >= 0; i--) {
		// vysklonovani
		var ret = skl2(aTxt[i]);
		if (typeof ret === 'object') {
			if (ret.error) {
				res.json({
					error: ret.error
				});
				return false;
			}
		}

		// vynuceni rodu podle posledniho slova
		if (i == aTxt.length - 1) PrefRod = astrTvar[0];

		// pokud nenajdeme vzor tak nesklonujeme
		if (i < aTxt.length - 1 && astrTvar[0].charAt(0) == '?' && PrefRod.charAt(0) != '?') {
			for (j = 1; j < 15; j++)
			astrTvar[j] = aTxt[i];
		}

		if (astrTvar[0].charAt(0) == '?') astrTvar[0] = '?';

		result.rod = astrTvar[0] + result.rod;
		result.p1j = (astrTvar[1] + ' ' + result.p1j).trim();
		result.p2j = (astrTvar[2] + ' ' + result.p2j).trim();
		result.p3j = (astrTvar[3] + ' ' + result.p3j).trim();
		result.p4j = (astrTvar[4] + ' ' + result.p4j).trim();
		result.p5j = (astrTvar[5] + ' ' + result.p5j).trim();
		result.p6j = (astrTvar[6] + ' ' + result.p6j).trim();
		result.p7j = (astrTvar[7] + ' ' + result.p7j).trim();
		result.p1m = (astrTvar[8] + ' ' + result.p1m).trim();
		result.p2m = (astrTvar[9] + ' ' + result.p2m).trim();
		result.p3m = (astrTvar[10] + ' ' + result.p3m).trim();
		result.p4m = (astrTvar[11] + ' ' + result.p4m).trim();
		result.p5m = (astrTvar[12] + ' ' + result.p5m).trim();
		result.p6m = (astrTvar[13] + ' ' + result.p6m).trim();
		result.p7m = (astrTvar[14] + ' ' + result.p7m).trim();
	}

	return result;
}

//
// Přídavná jména a zájmena
//
vzor[nvz++] = new Array("m", "-ký", "kého", "kému", "ký/kého", "ký", "kém", "kým", "-ké/-cí", "kých", "kým", "ké", "-ké/-cí", "kých", "kými");
vzor[nvz++] = new Array("m", "-rý", "rého", "rému", "rý/rého", "rý", "rém", "rým", "-ré/-ří", "rých", "rým", "ré", "-ré/-ří", "rých", "rými");
vzor[nvz++] = new Array("m", "-chý", "chého", "chému", "chý/chého", "chý", "chém", "chým", "-ché/-ší", "chých", "chým", "ché", "-ché/-ší", "chých", "chými");
vzor[nvz++] = new Array("m", "-hý", "hého", "hému", "hý/hého", "hý", "hém", "hým", "-hé/-zí", "hých", "hým", "hé", "-hé/-zí", "hých", "hými");
vzor[nvz++] = new Array("m", "-ý", "ého", "ému", "ý/ého", "ý", "ém", "ým", "-é/-í", "ých", "ým", "é", "-é/-í", "ých", "ými");
vzor[nvz++] = new Array("m", "-[aeěií]cí", "0cího", "0címu", "0cí/0cího", "0cí", "0cím", "0cím", "0cí", "0cích", "0cím", "0cí", "0cí", "0cích", "0cími");
vzor[nvz++] = new Array("ž", "-[aeěií]cí", "0cí", "0cí", "0cí", "0cí", "0cí", "0cí", "0cí", "0cích", "0cím", "0cí", "0cí", "0cích", "0cími");
vzor[nvz++] = new Array("s", "-[aeěií]cí", "0cího", "0címu", "0cí/0cího", "0cí", "0cím", "0cím", "0cí", "0cích", "0cím", "0cí", "0cí", "0cích", "0cími");
vzor[nvz++] = new Array("m", "-[bcčdhklmnprsštvzž]ní", "0ního", "0nímu", "0ní/0ního", "0ní", "0ním", "0ním", "0ní", "0ních", "0ním", "0ní", "0ní", "0ních", "0ními");
vzor[nvz++] = new Array("ž", "-[bcčdhklmnprsštvzž]ní", "0ní", "0ní", "0ní", "0ní", "0ní", "0ní", "0ní", "0ních", "0ním", "0ní", "0ní", "0ních", "0ními");
vzor[nvz++] = new Array("s", "-[bcčdhklmnprsštvzž]ní", "0ního", "0nímu", "0ní/0ního", "0ní", "0ním", "0ním", "0ní", "0ních", "0ním", "0ní", "0ní", "0ních", "0ními");

vzor[nvz++] = new Array("m", "-[i]tel", "0tele", "0teli", "0tele", "0tel", "0teli", "0telem", "0telé", "0telů", "0telům", "0tele", "0telé", "0telích", "0teli");
vzor[nvz++] = new Array("m", "-[í]tel", "0tele", "0teli", "0tele", "0tel", "0teli", "0telem", "átelé", "áteli", "átelům", "átele", "átelé", "átelích", "áteli");


vzor[nvz++] = new Array("s", "-é", "ého", "ému", "é", "é", "ém", "ým", "-á", "ých", "ým", "á", "á", "ých", "ými");
vzor[nvz++] = new Array("ž", "-á", "é", "é", "ou", "á", "é", "ou", "-é", "ých", "ým", "é", "é", "ých", "ými");
vzor[nvz++] = new Array("-", "já", "mne", "mně", "mne/mě", "já", "mně", "mnou", "my", "nás", "nám", "nás", "my", "nás", "námi");
vzor[nvz++] = new Array("-", "ty", "tebe", "tobě", "tě/tebe", "ty", "tobě", "tebou", "vy", "vás", "vám", "vás", "vy", "vás", "vámi");
vzor[nvz++] = new Array("-", "my", "", "", "", "", "", "", "my", "nás", "nám", "nás", "my", "nás", "námi");
vzor[nvz++] = new Array("-", "vy", "", "", "", "", "", "", "vy", "vás", "vám", "vás", "vy", "vás", "vámi");
vzor[nvz++] = new Array("m", "on", "něho", "mu/jemu/němu", "ho/jej", "on", "něm", "ním", "oni", "nich", "nim", "je", "oni", "nich", "jimi/nimi");
vzor[nvz++] = new Array("m", "oni", "", "", "", "", "", "", "oni", "nich", "nim", "je", "oni", "nich", "jimi/nimi");
vzor[nvz++] = new Array("ž", "ony", "", "", "", "", "", "", "ony", "nich", "nim", "je", "ony", "nich", "jimi/nimi");
vzor[nvz++] = new Array("s", "ono", "něho", "mu/jemu/němu", "ho/jej", "ono", "něm", "ním", "ona", "nich", "nim", "je", "ony", "nich", "jimi/nimi");
vzor[nvz++] = new Array("ž", "ona", "ní", "ní", "ji", "ona", "ní", "ní", "ony", "nich", "nim", "je", "ony", "nich", "jimi/nimi");
vzor[nvz++] = new Array("m", "ten", "toho", "tomu", "toho", "ten", "tom", "tím", "ti", "těch", "těm", "ty", "ti", "těch", "těmi");
vzor[nvz++] = new Array("ž", "ta", "té", "té", "tu", "ta", "té", "tou", "ty", "těch", "těm", "ty", "ty", "těch", "těmi");
vzor[nvz++] = new Array("s", "to", "toho", "tomu", "toho", "to", "tom", "tím", "ta", "těch", "těm", "ta", "ta", "těch", "těmi");

// přivlastňovací zájmena
vzor[nvz++] = new Array("m", "můj", "mého", "mému", "mého", "můj", "mém", "mým", "mí", "mých", "mým", "mé", "mí", "mých", "mými");
vzor[nvz++] = new Array("ž", "má", "mé", "mé", "mou", "má", "mé", "mou", "mé", "mých", "mým", "mé", "mé", "mých", "mými");
vzor[nvz++] = new Array("ž", "moje", "mé", "mé", "mou", "má", "mé", "mou", "mé", "mých", "mým", "mé", "mé", "mých", "mými");
vzor[nvz++] = new Array("s", "mé", "mého", "mému", "mého", "moje", "mém", "mým", "má", "mých", "mým", "mé", "má", "mých", "mými");
vzor[nvz++] = new Array("s", "moje", "mého", "mému", "mého", "moje", "mém", "mým", "má", "mých", "mým", "mé", "má", "mých", "mými");

vzor[nvz++] = new Array("m", "tvůj", "tvého", "tvému", "tvého", "tvůj", "tvém", "tvým", "tví", "tvých", "tvým", "tvé", "tví", "tvých", "tvými");
vzor[nvz++] = new Array("ž", "tvá", "tvé", "tvé", "tvou", "tvá", "tvé", "tvou", "tvé", "tvých", "tvým", "tvé", "tvé", "tvých", "tvými");
vzor[nvz++] = new Array("ž", "tvoje", "tvé", "tvé", "tvou", "tvá", "tvé", "tvou", "tvé", "tvých", "tvým", "tvé", "tvé", "tvých", "tvými");
vzor[nvz++] = new Array("s", "tvé", "tvého", "tvému", "tvého", "tvůj", "tvém", "tvým", "tvá", "tvých", "tvým", "tvé", "tvá", "tvých", "tvými");
vzor[nvz++] = new Array("s", "tvoje", "tvého", "tvému", "tvého", "tvůj", "tvém", "tvým", "tvá", "tvých", "tvým", "tvé", "tvá", "tvých", "tvými");

vzor[nvz++] = new Array("m", "náš", "našeho", "našemu", "našeho", "náš", "našem", "našim", "naši", "našich", "našim", "naše", "naši", "našich", "našimi");
vzor[nvz++] = new Array("ž", "naše", "naší", "naší", "naši", "naše", "naší", "naší", "naše", "našich", "našim", "naše", "naše", "našich", "našimi");
vzor[nvz++] = new Array("s", "naše", "našeho", "našemu", "našeho", "naše", "našem", "našim", "naše", "našich", "našim", "naše", "naše", "našich", "našimi");

vzor[nvz++] = new Array("m", "váš", "vašeho", "vašemu", "vašeho", "váš", "vašem", "vašim", "vaši", "vašich", "vašim", "vaše", "vaši", "vašich", "vašimi");
vzor[nvz++] = new Array("ž", "vaše", "vaší", "vaší", "vaši", "vaše", "vaší", "vaší", "vaše", "vašich", "vašim", "vaše", "vaše", "vašich", "vašimi");
vzor[nvz++] = new Array("s", "vaše", "vašeho", "vašemu", "vašeho", "vaše", "vašem", "vašim", "vaše", "vašich", "vašim", "vaše", "vaše", "vašich", "vašimi");

vzor[nvz++] = new Array("m", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho");
vzor[nvz++] = new Array("ž", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho");
vzor[nvz++] = new Array("s", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho", "jeho");

vzor[nvz++] = new Array("m", "její", "jejího", "jejímu", "jejího", "její", "jejím", "jejím", "její", "jejích", "jejím", "její", "její", "jejích", "jejími");
vzor[nvz++] = new Array("s", "její", "jejího", "jejímu", "jejího", "její", "jejím", "jejím", "její", "jejích", "jejím", "její", "její", "jejích", "jejími");
vzor[nvz++] = new Array("ž", "její", "její", "její", "její", "její", "její", "její", "její", "jejích", "jejím", "její", "její", "jejích", "jejími");

vzor[nvz++] = new Array("m", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich");
vzor[nvz++] = new Array("s", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich");
vzor[nvz++] = new Array("ž", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich", "jejich");


// výjimky (zvl. běžná slova)
vzor[nvz++] = new Array("m", "-bůh", "boha", "bohu", "boha", "bože", "bohovi", "bohem", "bozi/bohové", "bohů", "bohům", "bohy", "bozi/bohové", "bozích", "bohy");
vzor[nvz++] = new Array("m", "-pan", "pana", "panu", "pana", "pane", "panu", "panem", "páni/pánové", "pánů", "pánům", "pány", "páni/bohové", "pánech", "pány");
vzor[nvz++] = new Array("-", "-dveře", "", "", "", "", "", "", "dveře", "dveří", "dveřím", "dveře", "dveře", "dveřích", "dveřmi");
vzor[nvz++] = new Array("m", "-vztek", "vzteku", "vzteku", "vztek", "vzteku", "vzteku", "vztekem", "vzteky", "vzteků", "vztekům", "vzteky", "vzteky", "vztecích", "vzteky");
vzor[nvz++] = new Array("m", "-dotek", "doteku", "doteku", "dotek", "doteku", "doteku", "dotekem", "doteky", "doteků", "dotekům", "doteky", "doteky", "dotecích", "doteky");
vzor[nvz++] = new Array("ž", "-hra", "hry", "hře", "hru", "hro", "hře", "hrou", "hry", "her", "hrám", "hry", "hry", "hrách", "hrami");

// číslovky
vzor[nvz++] = new Array("-", "-tdva", "tidvou", "tidvoum", "tdva", "tdva", "tidvou", "tidvěmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tdvě", "tidvou", "tidvěma", "tdva", "tdva", "tidvou", "tidvěmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-ttři", "titří", "titřem", "ttři", "ttři", "titřech", "titřemi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tčtyři", "tičtyřech", "tičtyřem", "tčtyři", "tčtyři", "tičtyřech", "tičtyřmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tpět", "tipěti", "tipěti", "tpět", "tpět", "tipěti", "tipěti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tšest", "tišesti", "tišesti", "tšest", "tšest", "tišesti", "tišesti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tsedm", "tisedmi", "tisedmi", "tsedm", "tsedm", "tisedmi", "tisedmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tosm", "tiosmi", "tiosmi", "tosm", "tosm", "tiosmi", "tiosmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tdevět", "tidevíti", "tidevíti", "tdevět", "tdevět", "tidevíti", "tidevíti", "?", "?", "?", "?", "?", "?", "?");

vzor[nvz++] = new Array("ž", "-jedna", "jedné", "jedné", "jednu", "jedno", "jedné", "jednou", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("m", "-jeden", "jednoho", "jednomu", "jednoho", "jeden", "jednom", "jedním", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("s", "-jedno", "jednoho", "jednomu", "jednoho", "jedno", "jednom", "jedním", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-dva", "dvou", "dvoum", "dva", "dva", "dvou", "dvěmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-dvě", "dvou", "dvoum", "dva", "dva", "dvou", "dvěmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-tři", "tří", "třem", "tři", "tři", "třech", "třemi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-čtyři", "čtyřech", "čtyřem", "čtyři", "čtyři", "čtyřech", "čtyřmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-pět", "pěti", "pěti", "pět", "pět", "pěti", "pěti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-šest", "šesti", "šesti", "šest", "šest", "šesti", "šesti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-sedm", "sedmi", "sedmi", "sedm", "sedm", "sedmi", "sedmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-osm", "osmi", "osmi", "osm", "osm", "osmi", "osmi", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-devět", "devíti", "devíti", "devět", "devět", "devíti", "devíti", "?", "?", "?", "?", "?", "?", "?");

vzor[nvz++] = new Array("-", "deset", "deseti", "deseti", "deset", "deset", "deseti", "deseti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-ná[cs]t", "ná0ti", "ná0ti", "ná0t", "náct", "ná0ti", "ná0ti", "?", "?", "?", "?", "?", "?", "?");

vzor[nvz++] = new Array("-", "-dvacet", "dvaceti", "dvaceti", "dvacet", "dvacet", "dvaceti", "dvaceti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-třicet", "třiceti", "třiceti", "třicet", "třicet", "třiceti", "třiceti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-čtyřicet", "čtyřiceti", "čtyřiceti", "čtyřicet", "čtyřicet", "čtyřiceti", "čtyřiceti", "?", "?", "?", "?", "?", "?", "?");
vzor[nvz++] = new Array("-", "-desát", "desáti", "desáti", "desát", "desát", "desáti", "desáti", "?", "?", "?", "?", "?", "?", "?");



//
// Spec. přídady skloňování(+předseda, srdce jako úplná výjimka)
//
vzor[nvz++] = new Array("m", "-[i]sta", "0sty", "0stovi", "0stu", "0sto", "0stovi", "0stou", "-0sté", "0stů", "0stům", "0sty", "0sté", "0stech", "0sty");
vzor[nvz++] = new Array("m", "-[o]sta", "0sty", "0stovi", "0stu", "0sto", "0stovi", "0stou", "-0stové", "0stů", "0stům", "0sty", "0sté", "0stech", "0sty");
vzor[nvz++] = new Array("m", "-předseda", "předsedy", "předsedovi", "předsedu", "předsedo", "předsedovi", "předsedou", "předsedové", "předsedů", "předsedům", "předsedy", "předsedové", "předsedech", "předsedy");
vzor[nvz++] = new Array("m", "-srdce", "srdce", "srdi", "sdrce", "srdce", "srdci", "srdcem", "srdce", "srdcí", "srdcím", "srdce", "srdce", "srdcích", "srdcemi");
vzor[nvz++] = new Array("m", "-[db]ce", "0ce", "0ci", "0ce", "0če", "0ci", "0cem", "0ci/0cové", "0ců", "0cům", "0ce", "0ci/0cové", "0cích", "0ci");
vzor[nvz++] = new Array("m", "-[jň]ev", "0evu", "0evu", "0ev", "0eve", "0evu", "0evem", "-0evy", "0evů", "0evům", "0evy", "0evy", "0evech", "0evy");
vzor[nvz++] = new Array("m", "-[lř]ev", "0evu/0va", "0evu/0vovi", "0ev/0va", "0eve/0ve", "0evu/0vovi", "0evem/0vem", "-0evy/0vové", "0evů/0vů", "0evům/0vům", "0evy/0vy", "0evy/0vové", "0evech/0vech", "0evy/0vy");

vzor[nvz++] = new Array("m", "-ů[lz]", "o0u/o0a", "o0u/o0ovi", "ů0/o0a", "o0e", "o0u", "o0em", "o-0y/o-0ové", "o0ů", "o0ům", "o0y", "o0y/o0ové", "o0ech", "o0y");

// výj. nůž (vzor muž)
vzor[nvz++] = new Array("m", "nůž", "nože", "noži", "nůž", "noži", "noži", "nožem", "nože", "nožů", "nožům", "nože", "nože", "nožích", "noži");


//
// Vzor kolo
//
vzor[nvz++] = new Array("s", "-[bcčdghksštvzž]lo", "0la", "0lu", "0lo", "0lo", "0lu", "0lem", "-0la", "0el", "0lům", "0la", "0la", "0lech", "0ly");
vzor[nvz++] = new Array("s", "-[bcčdnsštvzž]ko", "0ka", "0ku", "0ko", "0ko", "0ku", "0kem", "-0ka", "0ek", "0kům", "0ka", "0ka", "0cích/0kách", "0ky");
vzor[nvz++] = new Array("s", "-[bcčdksštvzž]no", "0na", "0nu", "0no", "0no", "0nu", "0nem", "-0na", "0en", "0nům", "0na", "0na", "0nech/0nách", "0ny");
vzor[nvz++] = new Array("s", "-o", "a", "u", "o", "o", "u", "em", "-a", "", "ům", "a", "a", "ech", "y");


//
// Vzor stavení
//
vzor[nvz++] = new Array("s", "-í", "í", "í", "í", "í", "í", "ím", "-í", "í", "ím", "í", "í", "ích", "ími");
//
// Vzor děvče  (če,dě,tě,ně,pě) výj.-také sele
//
vzor[nvz++] = new Array("s", "-[čďť][e]", "10te", "10ti", "10", "10", "10ti", "10tem", "1-ata", "1at", "1atům", "1ata", "1ata", "1atech", "1aty");
vzor[nvz++] = new Array("s", "-[pb][ě]", "10te", "10ti", "10", "10", "10ti", "10tem", "1-ata", "1at", "1atům", "1ata", "1ata", "1atech", "1aty");

//
// Vzor žena
//
vzor[nvz++] = new Array("ž", "-[aeiouyáéíóúý]ka", "0ky", "0ce", "0ku", "0ko", "0ce", "0kou", "-0ky", "0k", "0kám", "0ky", "0ky", "0kách", "0kami");
vzor[nvz++] = new Array("ž", "-ka", "ky", "ce", "ku", "ko", "ce", "kou", "-ky", "ek", "kám", "ky", "ky", "kách", "kami");
vzor[nvz++] = new Array("ž", "-[bdghkmnptvz]ra", "0ry", "0ře", "0ru", "0ro", "0ře", "0rou", "-0ry", "0er", "0rám", "0ry", "0ry", "0rách", "0rami");
vzor[nvz++] = new Array("ž", "-ra", "ry", "ře", "ru", "ro", "ře", "rou", "-ry", "r", "rám", "ry", "ry", "rách", "rami");
vzor[nvz++] = new Array("ž", "-[tdbnvmp]a", "0y", "0ě", "0u", "0o", "0ě", "0ou", "-0y", "0", "0ám", "0y", "0y", "0ách", "0ami");
vzor[nvz++] = new Array("ž", "-cha", "chy", "še", "chu", "cho", "še", "chou", "-chy", "ch", "chám", "chy", "chy", "chách", "chami");
vzor[nvz++] = new Array("ž", "-[gh]a", "0y", "ze", "0u", "0o", "ze", "0ou", "-0y", "0", "0ám", "0y", "0y", "0ách", "0ami");
vzor[nvz++] = new Array("ž", "-ňa", "ni", "ně", "ňou", "ňo", "ni", "ňou", "-ně/ničky", "ň", "ňám", "ně/ničky", "ně/ničky", "ňách", "ňami");
vzor[nvz++] = new Array("ž", "-[šč]a", "0i", "0e", "0u", "0o", "0e", "0ou", "-0e/0i", "0", "0ám", "0e/0i", "0e/0i", "0ách", "0ami");
vzor[nvz++] = new Array("ž", "-a", "y", "e", "u", "o", "e", "ou", "-y", "", "ám", "y", "y", "ách", "ami");

// vz. píseň
vzor[nvz++] = new Array("ž", "-eň", "ně", "ni", "eň", "ni", "ni", "ní", "-ně", "ní", "ním", "ně", "ně", "ních", "němi");
vzor[nvz++] = new Array("ž", "-oň", "oně", "oni", "oň", "oni", "oni", "oní", "-oně", "oní", "oním", "oně", "oně", "oních", "oněmi");
vzor[nvz++] = new Array("ž", "-[ě]j", "0je", "0ji", "0j", "0ji", "0ji", "0jí", "-0je", "0jí", "0jím", "0je", "0je", "0jích", "0jemi");

//
// Vzor růže
//
vzor[nvz++] = new Array("ž", "-ev", "ve", "vi", "ev", "vi", "vi", "ví", "-ve", "ví", "vím", "ve", "ve", "vích", "vemi");
vzor[nvz++] = new Array("ž", "-ice", "ice", "ici", "ici", "ice", "ici", "icí", "-ice", "ic", "icím", "ice", "ice", "icích", "icemi");
vzor[nvz++] = new Array("ž", "-e", "e", "i", "i", "e", "i", "í", "-e", "í", "ím", "e", "e", "ích", "emi");

//
// Vzor píseň
//
vzor[nvz++] = new Array("ž", "-[eaá][jžň]", "10e/10i", "10i", "10", "10i", "10i", "10í", "-10e/10i", "10í", "10ím", "10e", "10e", "10ích", "10emi");
vzor[nvz++] = new Array("ž", "-[eayo][š]", "10e/10i", "10i", "10", "10i", "10i", "10í", "10e/10i", "10í", "10ím", "10e", "10e", "10ích", "10emi");
vzor[nvz++] = new Array("ž", "-[íy]ň", "0ně", "0ni", "0ň", "0ni", "0ni", "0ní", "-0ně", "0ní", "0ním", "0ně", "0ně", "0ních", "0němi");
vzor[nvz++] = new Array("ž", "-[íyý]ňe", "0ně", "0ni", "0ň", "0ni", "0ni", "0ní", "-0ně", "0ní", "0ním", "0ně", "0ně", "0ních", "0němi");
vzor[nvz++] = new Array("ž", "-[ťďž]", "0e", "0i", "0", "0i", "0i", "0í", "-0e", "0í", "0ím", "0e", "0e", "0ích", "0emi");
vzor[nvz++] = new Array("ž", "-toř", "toře", "toři", "toř", "toři", "toři", "toří", "-toře", "toří", "tořím", "toře", "toře", "tořích", "tořemi");
vzor[nvz++] = new Array("ž", "-ep", "epi", "epi", "ep", "epi", "epi", "epí", "epi", "epí", "epím", "epi", "epi", "epích", "epmi");

//
// Vzor kost
//
vzor[nvz++] = new Array("ž", "-st", "sti", "sti", "st", "sti", "sti", "stí", "-sti", "stí", "stem", "sti", "sti", "stech", "stmi");
vzor[nvz++] = new Array("ž", "ves", "vsi", "vsi", "ves", "vsi", "vsi", "vsí", "vsi", "vsí", "vsem", "vsi", "vsi", "vsech", "vsemi");

//
//
// Vzor Amadeus, Celsius, Kumulus, rektikulum, praktikum
//
vzor[nvz++] = new Array("m", "-[e]us", "0a", "0u/0ovi", "0a", "0e", "0u/0ovi", "0em", "0ové", "0ů", "0ům", "0y", "0ové", "0ích", "0y");
vzor[nvz++] = new Array("m", "-[i]us", "0a", "0u/0ovi", "0a", "0e", "0u/0ovi", "0em", "0ové", "0ů", "0ům", "0usy", "0ové", "0ích", "0usy");
vzor[nvz++] = new Array("m", "-[i]s", "0se", "0su/0sovi", "0se", "0se/0si", "0su/0sovi", "0sem", "0sy/0sové", "0sů", "0sům", "0sy", "0sy/0ové", "0ech", "0sy");
vzor[nvz++] = new Array("m", "výtrus", "výtrusu", "výtrusu", "výtrus", "výtruse", "výtrusu", "výtrusem", "výtrusy", "výtrusů", "výtrusům", "výtrusy", "výtrusy", "výtrusech", "výtrusy");
vzor[nvz++] = new Array("m", "trus", "trusu", "trusu", "trus", "truse", "trusu", "trusem", "trusy", "trusů", "trusům", "trusy", "trusy", "trusech", "trusy");
vzor[nvz++] = new Array("m", "-[aeioumpts][lnmrktp]us", "10u/10a", "10u/10ovi", "10us/10a", "10e", "10u/10ovi", "10em", "10y/10ové", "10ů", "10ům", "10y", "10y/10ové", "10ech", "10y");
vzor[nvz++] = new Array("s", "-[l]um", "0a", "0u", "0um", "0um", "0u", "0em", "0a", "0", "0ům", "0a", "0a", "0ech", "0y");
vzor[nvz++] = new Array("s", "-[k]um", "0a", "0u", "0um", "0um", "0u", "0em", "0a", "0", "0ům", "0a", "0a", "0cích", "0y");
vzor[nvz++] = new Array("s", "-[i]um", "0a", "0u", "0um", "0um", "0u", "0em", "0a", "0í", "0ům", "0a", "0a", "0iích", "0y");
vzor[nvz++] = new Array("s", "-[i]um", "0a", "0u", "0um", "0um", "0u", "0em", "0a", "0ejí", "0ům", "0a", "0a", "0ejích", "0y");
vzor[nvz++] = new Array("s", "-io", "0a", "0u", "0", "0", "0u", "0em", "0a", "0í", "0ům", "0a", "0a", "0iích", "0y");

//
// Vzor sedlák
//

vzor[nvz++] = new Array("m", "-[aeiouyáéíóúý]r", "0ru/0ra", "0ru/0rovi", "0r/0ra", "0re", "0ru/0rovi", "0rem", "-0ry/-0rové", "0rů", "0rům", "0ry", "0ry/0rové", "0rech", "0ry");
// vzor[nvz++] = new Array( "m","-[aeiouyáéíóúý]r","0ru/0ra","0ru/0rovi","0r/0ra","0re","0ru/0rovi","0rem",     "-0ry/-0ři","0rů","0rům","0ry","0ry/0ři", "0rech","0ry" )
vzor[nvz++] = new Array("m", "-r", "ru/ra", "ru/rovi", "r/ra", "ře", "ru/rovi", "rem", "-ry/-rové", "rů", "rům", "ry", "ry/rové", "rech", "ry");
// vzor[nvz++] = new Array( "m","-r",              "ru/ra",  "ru/rovi",  "r/ra",  "ře", "ru/rovi",   "rem",     "-ry/-ři", "rů","rům","ry",    "ry/ři",  "rech", "ry" )
vzor[nvz++] = new Array("m", "-[bcčdnmprstvz]en", "0nu/0na", "0nu/0novi", "0en/0na", "0ne", "0nu/0novi", "0nem", "-0ny/0nové", "0nů", "0nům", "0ny", "0ny/0nové", "0nech", "0ny");
vzor[nvz++] = new Array("m", "-[dglmnpbtvzs]", "0u/0a", "0u/0ovi", "0/0a", "0e", "0u/0ovi", "0em", "-0y/0ové", "0ů", "0ům", "0y", "0y/0ové", "0ech", "0y");
vzor[nvz++] = new Array("m", "-[x]", "0u/0e", "0u/0ovi", "0/0e", "0i", "0u/0ovi", "0em", "-0y/0ové", "0ů", "0ům", "0y", "0y/0ové", "0ech", "0y");
vzor[nvz++] = new Array("m", "sek", "seku/seka", "seku/sekovi", "sek/seka", "seku", "seku/sekovi", "sekem", "seky/sekové", "seků", "sekům", "seky", "seky/sekové", "secích", "seky");
vzor[nvz++] = new Array("m", "výsek", "výseku/výseka", "výseku/výsekovi", "výsek/výseka", "výseku", "výseku/výsekovi", "výsekem", "výseky/výsekové", "výseků", "výsekům", "výseky", "výseky/výsekové", "výsecích", "výseky");
vzor[nvz++] = new Array("m", "zásek", "záseku/záseka", "záseku/zásekovi", "zásek/záseka", "záseku", "záseku/zásekovi", "zásekem", "záseky/zásekové", "záseků", "zásekům", "záseky", "záseky/zásekové", "zásecích", "záseky");
vzor[nvz++] = new Array("m", "průsek", "průseku/průseka", "průseku/průsekovi", "průsek/průseka", "průseku", "průseku/průsekovi", "průsekem", "průseky/průsekové", "průseků", "výsekům", "průseky", "průseky/průsekové", "průsecích", "průseky");
vzor[nvz++] = new Array("m", "-[cčšždnňmpbrstvz]ek", "0ku/0ka", "0ku/0kovi", "0ek/0ka", "0ku", "0ku/0kovi", "0kem", "-0ky/0kové", "0ků", "0kům", "0ky", "0ky/0kové", "0cích", "0ky");
vzor[nvz++] = new Array("m", "-[k]", "0u/0a", "0u/0ovi", "0/0a", "0u", "0u/0ovi", "0em", "-0y/0ové", "0ů", "0ům", "0y", "0y/0ové", "cích", "0y");
vzor[nvz++] = new Array("m", "-ch", "chu/cha", "chu/chovi", "ch/cha", "chu/cha", "chu/chovi", "chem", "-chy/chové", "chů", "chům", "chy", "chy/chové", "ších", "chy");
vzor[nvz++] = new Array("m", "-[h]", "0u/0a", "0u/0ovi", "0/0a", "0u/0a", "0u/0ovi", "0em", "-0y/0ové", "0ů", "0ům", "0y", "0y/0ové", "zích", "0y");
vzor[nvz++] = new Array("m", "-e[mnz]", "0u/0a", "0u/0ovi", "e0/e0a", "0e", "0u/0ovi", "0em", "-0y/0ové", "0ů", "0ům", "0y", "0y/0ové", "0ech", "0y");

//
//
// Vzor muž
//
vzor[nvz++] = new Array("m", "-ec", "ce", "ci/covi", "ec/ce", "če", "ci/covi", "cem", "-ce/cové", "ců", "cům", "ce", "ce/cové", "cích", "ci");
vzor[nvz++] = new Array("m", "-[cčďšňřťž]", "0e", "0i/0ovi", "0e", "0i", "0i/0ovi", "0em", "-0e/0ové", "0ů", "0ům", "0e", "0e/0ové", "0ích", "0i");
vzor[nvz++] = new Array("m", "-oj", "oje", "oji/ojovi", "oj/oje", "oji", "oji/ojovi", "ojem", "-oje/ojové", "ojů", "ojům", "oje", "oje/ojové", "ojích", "oji");

// Vzory pro přetypování rodu
vzor[nvz++] = new Array("m", "-[gh]a", "0y", "0ovi", "0u", "0o", "0ovi", "0ou", "0ové", "0ů", "0ům", "0y", "0ové", "zích", "0y");
vzor[nvz++] = new Array("m", "-[k]a", "0y", "0ovi", "0u", "0o", "0ovi", "0ou", "0ové", "0ů", "0ům", "0y", "0ové", "cích", "0y");
vzor[nvz++] = new Array("m", "-a", "y", "ovi", "u", "o", "ovi", "ou", "ové", "ů", "ům", "y", "ové", "ech", "y");

vzor[nvz++] = new Array("ž", "-l", "le", "li", "l", "li", "li", "lí", "le", "lí", "lím", "le", "le", "lích", "lemi");
vzor[nvz++] = new Array("ž", "-í", "í", "í", "í", "í", "í", "í", "í", "ích", "ím", "í", "í", "ích", "ími");
vzor[nvz++] = new Array("ž", "-[jř]", "0e", "0i", "0", "0i", "0i", "0í", "0e", "0í", "0ím", "0e", "0e", "0ích", "0emi");
vzor[nvz++] = new Array("ž", "-[č]", "0i", "0i", "0", "0i", "0i", "0í", "0i", "0í", "0ím", "0i", "0i", "0ích", "0mi");
vzor[nvz++] = new Array("ž", "-[š]", "0i", "0i", "0", "0i", "0i", "0í", "0i", "0í", "0ím", "0i", "0i", "0ích", "0emi");

vzor[nvz++] = new Array("s", "-[sljřň]e", "0ete", "0eti", "0e", "0e", "0eti", "0etem", "0ata", "0at", "0atům", "0ata", "0ata", "0atech", "0aty");
// vzor[nvz++] = new Array( "ž","-cí",        "cí", "cí",  "cí", "cí", "cí", "cí",   "cí", "cích", "cím", "cí", "cí", "cích", "cími" )
// čaj, prodej, Ondřej, žokej
vzor[nvz++] = new Array("m", "-j", "je", "ji", "j", "ji", "ji", "jem", "je/jové", "jů", "jům", "je", "je/jové", "jích", "ji");
// Josef, Detlef, ... ?
vzor[nvz++] = new Array("m", "-f", "fa", "fu/fovi", "f/fa", "fe", "fu/fovi", "fem", "fy/fové", "fů", "fům", "fy", "fy/fové", "fech", "fy");
// zbroj, výzbroj, výstroj, trofej, neteř
// jiří, podkoní, ... ?
vzor[nvz++] = new Array("m", "-í", "ího", "ímu", "ího", "í", "ímu", "ím", "í", "ích", "ím", "í", "í", "ích", "ími");
// Hugo
vzor[nvz++] = new Array("m", "-go", "a", "govi", "ga", "ga", "govi", "gem", "gové", "gů", "gům", "gy", "gové", "zích", "gy");
// Kvido
vzor[nvz++] = new Array("m", "-o", "a", "ovi", "a", "a", "ovi", "em", "ové", "ů", "ům", "y", "ové", "ech", "y");


// doplňky
// některá pomnožná jména
vzor[nvz++] = new Array("?", "-[tp]y", "?", "?", "?", "?", "?", "?", "-0y", "0", "0ům", "0y", "0y", "0ech", "0ami");
vzor[nvz++] = new Array("?", "-[k]y", "?", "?", "?", "?", "?", "?", "-0y", "e0", "0ám", "0y", "0y", "0ách", "0ami");


aCmpReg = new Array();
nCmpReg = 0;
aCmpReg[0] = "";
aCmpReg[1] = "";
aCmpReg[2] = "";
aCmpReg[3] = "";
aCmpReg[4] = "";
aCmpReg[5] = "";
aCmpReg[6] = "";
aCmpReg[7] = "";
aCmpReg[8] = "";
aCmpReg[9] = "";

//  Výjimky:
//  v1 - přehlásky
// :  důl ... dol, stůl ... stol, nůž ... nož, hůl ... hole, půl ... půle
nv1 = 0;
v1 = new Array();
//                      1.p   náhrada   4.p.
//
v1[nv1++] = new Array("osel", "osl", "osla");
v1[nv1++] = new Array("karel", "karl", "karla");
v1[nv1++] = new Array("Karel", "Karl", "Karla");
v1[nv1++] = new Array("pavel", "pavl", "pavla");
v1[nv1++] = new Array("Pavel", "Pavl", "Pavla");
v1[nv1++] = new Array("Havel", "Havl", "Havla");
v1[nv1++] = new Array("havel", "havl", "havla");
v1[nv1++] = new Array("Bořek", "Bořk", "Bořka");
v1[nv1++] = new Array("bořek", "bořk", "bořka");
v1[nv1++] = new Array("Luděk", "Luďk", "Luďka");
v1[nv1++] = new Array("luděk", "luďk", "luďka");
v1[nv1++] = new Array("pes", "ps", "psa");
v1[nv1++] = new Array("pytel", "pytl", "pytel");
v1[nv1++] = new Array("ocet", "oct", "octa");
v1[nv1++] = new Array("chléb", "chleb", "chleba");
v1[nv1++] = new Array("chleba", "chleb", "chleba");
v1[nv1++] = new Array("pavel", "pavl", "pavla");
v1[nv1++] = new Array("kel", "kl", "kel");
v1[nv1++] = new Array("sopel", "sopl", "sopel");
v1[nv1++] = new Array("posel", "posl", "posla");
v1[nv1++] = new Array("důl", "dol", "důl");
v1[nv1++] = new Array("sůl", "sole", "sůl");
v1[nv1++] = new Array("vůl", "vol", "vola");
v1[nv1++] = new Array("půl", "půle", "půli");
v1[nv1++] = new Array("hůl", "hole", "hůl");
v1[nv1++] = new Array("stůl", "stol", "stůl");
v1[nv1++] = new Array("líh", "lih", "líh");
v1[nv1++] = new Array("sníh", "sněh", "sníh");
v1[nv1++] = new Array("zář", "záře", "zář");
v1[nv1++] = new Array("svatozář", "svatozáře", "svatozář");
v1[nv1++] = new Array("kůň", "koň", "koně");
v1[nv1++] = new Array("tůň", "tůňe", "tůň");
// --- !
v1[nv1++] = new Array("prsten", "prstýnek", "prstýnku");
v1[nv1++] = new Array("smrt", "smrť", "smrt");
v1[nv1++] = new Array("vítr", "větr", "vítr");
v1[nv1++] = new Array("stupeň", "stupň", "stupeň");
v1[nv1++] = new Array("peň", "pň", "peň");
v1[nv1++] = new Array("cyklus", "cykl", "cyklus");
v1[nv1++] = new Array("dvůr", "dvor", "dvůr");
v1[nv1++] = new Array("zeď", "zď", "zeď");
v1[nv1++] = new Array("účet", "účt", "účet");
v1[nv1++] = new Array("mráz", "mraz", "mráz");
v1[nv1++] = new Array("hnůj", "hnoj", "hnůj");
v1[nv1++] = new Array("skrýš", "skrýše", "skrýš");
v1[nv1++] = new Array("nehet", "neht", "nehet");
v1[nv1++] = new Array("veš", "vš", "veš");
v1[nv1++] = new Array("déšť", "dešť", "déšť");
v1[nv1++] = new Array("myš", "myše", "myš");

// v10 - zmena rodu na muzsky
v10 = new Array();
nv10 = 0;
v10[nv10++] = "sleď";
v10[nv10++] = "saša";
v10[nv10++] = "Saša";
v10[nv10++] = "dešť";
v10[nv10++] = "koň";
v10[nv10++] = "chlast";
v10[nv10++] = "plast";
v10[nv10++] = "termoplast";
v10[nv10++] = "vězeň";
v10[nv10++] = "sťežeň";
v10[nv10++] = "papež";
v10[nv10++] = "ďeda";
v10[nv10++] = "zeť";
v10[nv10++] = "háj";
v10[nv10++] = "lanýž";
v10[nv10++] = "sluha";
v10[nv10++] = "muž";
v10[nv10++] = "velmož";
v10[nv10++] = "Maťej";
v10[nv10++] = "maťej";
v10[nv10++] = "táta";
v10[nv10++] = "kolega";
v10[nv10++] = "mluvka";
v10[nv10++] = "strejda";
v10[nv10++] = "polda";
v10[nv10++] = "moula";
v10[nv10++] = "šmoula";
v10[nv10++] = "slouha";
v10[nv10++] = "drákula";
v10[nv10++] = "test";
v10[nv10++] = "rest";
v10[nv10++] = "trest";
v10[nv10++] = "arest";
v10[nv10++] = "azbest";
v10[nv10++] = "ametyst";
v10[nv10++] = "chřest";
v10[nv10++] = "protest";
v10[nv10++] = "kontest";
v10[nv10++] = "motorest";
v10[nv10++] = "most";
v10[nv10++] = "host";
v10[nv10++] = "kříž";
v10[nv10++] = "stupeň";
v10[nv10++] = "peň";
v10[nv10++] = "čaj";
v10[nv10++] = "prodej";
v10[nv10++] = "výdej";
v10[nv10++] = "výprodej";
v10[nv10++] = "ďej";
v10[nv10++] = "zloďej";
v10[nv10++] = "žokej";
v10[nv10++] = "hranostaj";
v10[nv10++] = "dobroďej";
v10[nv10++] = "darmoďej";
v10[nv10++] = "čaroďej";
v10[nv10++] = "koloďej";
v10[nv10++] = "sprej";
v10[nv10++] = "displej";
v10[nv10++] = "Aleš";
v10[nv10++] = "aleš";
v10[nv10++] = "Ambrož";
v10[nv10++] = "ambrož";
v10[nv10++] = "Tomáš";
v10[nv10++] = "Lukáš";
v10[nv10++] = "Tobiáš";
v10[nv10++] = "Jiří";
v10[nv10++] = "tomáš";
v10[nv10++] = "lukáš";
v10[nv10++] = "tobiáš";
v10[nv10++] = "jiří";
v10[nv10++] = "podkoní";
v10[nv10++] = "komoří";
v10[nv10++] = "Jirka";
v10[nv10++] = "jirka";
v10[nv10++] = "Ilja";
v10[nv10++] = "ilja";
v10[nv10++] = "Pepa";
v10[nv10++] = "Ondřej";
v10[nv10++] = "Andrej";
//  v10[nv10++] = "josef";
v10[nv10++] = "mikuláš";
v10[nv10++] = "Mikuláš";
v10[nv10++] = "Mikoláš";
v10[nv10++] = "mikoláš";
v10[nv10++] = "Kvido";
v10[nv10++] = "kvido";
v10[nv10++] = "Hugo";
v10[nv10++] = "hugo";
v10[nv10++] = "Oto";
v10[nv10++] = "oto";
v10[nv10++] = "Otto";
v10[nv10++] = "otto";
v10[nv10++] = "Alexej";
v10[nv10++] = "alexej";
v10[nv10++] = "Ivo";
v10[nv10++] = "ivo";
v10[nv10++] = "Bruno";
v10[nv10++] = "bruno";
v10[nv10++] = "Alois";
v10[nv10++] = "alois";
v10[nv10++] = "bartoloměj";
v10[nv10++] = "Bartoloměj";

// v11 - zmena rodu na zensky;
v11 = new Array();
nv11 = 0;
v11[nv11++] = "vš";
v11[nv11++] = "dešť";
v11[nv11++] = "zteč";
v11[nv11++] = "řeč";
v11[nv11++] = "křeč";
v11[nv11++] = "kleč";
v11[nv11++] = "maštal";
v11[nv11++] = "vš";
v11[nv11++] = "kancelář";
v11[nv11++] = "závěj";
v11[nv11++] = "zvěř";
v11[nv11++] = "sbeř";
v11[nv11++] = "neteř";
v11[nv11++] = "ves";
v11[nv11++] = "rozkoš";
// v11[nv11++] = "myša";
v11[nv11++] = "postel";
v11[nv11++] = "prdel";
v11[nv11++] = "koudel";
v11[nv11++] = "koupel";
v11[nv11++] = "ocel";
v11[nv11++] = "digestoř";
v11[nv11++] = "konzervatoř";
v11[nv11++] = "oratoř";
v11[nv11++] = "zbroj";
v11[nv11++] = "výzbroj";
v11[nv11++] = "výstroj";
v11[nv11++] = "trofej";
v11[nv11++] = "obec";
v11[nv11++] = "otep";
v11[nv11++] = "Miriam";
v11[nv11++] = "miriam";
v11[nv11++] = "Ester";
v11[nv11++] = "Dagmar";

// v11[nv11++] = "transmise"

// v12 - zmena rodu na stredni
v12 = new Array();
nv12 = 0;
v12[nv12++] = "nemluvňe";
v12[nv12++] = "slůně";
v12[nv12++] = "kůzle";
v12[nv12++] = "sele";
v12[nv12++] = "osle";
v12[nv12++] = "zvíře";
v12[nv12++] = "kuře";
v12[nv12++] = "tele";
v12[nv12++] = "prase";
v12[nv12++] = "house";
v12[nv12++] = "vejce";


// v0 - nedořešené výjimky
var v0 = new Array();
nv0 = 0;
//  v0[nv0++] = "ondřej"
//  v0[nv0++] = "josef"
//  v0[nv0++] = "déšť"
v0[nv0++] = "moře";
v0[nv0++] = "Ester";
v0[nv0++] = "Dagmar";
//  v0[nv0++] = "vejce"
v0[nv0++] = "housle";
v0[nv0++] = "šle";
v0[nv0++] = "ovoce";
//  v0[nv0++] = "sleď"
v0[nv0++] = "Zeus";
//  v0[nv0++] = "zbroj"
//  v0[nv0++] = "výzbroj"
//  v0[nv0++] = "výstroj"
//  v0[nv0++] = "obec"
//  v0[nv0++] = "konzervatoř"
//  v0[nv0++] = "digestoř"
v0[nv0++] = "humus";
v0[nv0++] = "muka";
v0[nv0++] = "noe";
v0[nv0++] = "Noe";
v0[nv0++] = "Miriam";
v0[nv0++] = "miriam";
// Je Nikola ženské nebo mužské jméno??? (podobně Sáva)

// v3 - různé odchylky ve skloňování
//    - časem by bylo vhodné opravit
nv3 = 0;
v3 = new Array();
v3[nv3++] = "jméno";
v3[nv3++] = "myš";
v3[nv3++] = "vězeň";
v3[nv3++] = "sťežeň";
v3[nv3++] = "oko";
v3[nv3++] = "sole";
v3[nv3++] = "šach";
v3[nv3++] = "veš";
v3[nv3++] = "myš";
v3[nv3++] = "klášter";
v3[nv3++] = "kněz";
v3[nv3++] = "král";
v3[nv3++] = "zď";
v3[nv3++] = "sto";
v3[nv3++] = "smrt";
v3[nv3++] = "leden";
v3[nv3++] = "len";
v3[nv3++] = "les";
v3[nv3++] = "únor";
v3[nv3++] = "březen";
v3[nv3++] = "duben";
v3[nv3++] = "květen";
v3[nv3++] = "červen";
v3[nv3++] = "srpen";
v3[nv3++] = "říjen";
v3[nv3++] = "pantofel";
v3[nv3++] = "žába";
v3[nv3++] = "zoja";
v3[nv3++] = "Zoja";
v3[nv3++] = "zoe";

// Ve zvl. pripadech je mozne pomoci teto promenne "pretypovat" rod jmena
var PrefRod = "0"; // smi byt "0", "m", "ž", "s"

//
//  Fce isShoda vraci index pri shode koncovky (napr. isShoda("-lo","kolo"), isShoda("ko-lo","motovidlo"))
//  nebo pri rovnosti slov (napr. isShoda("molo","molo").
//  Jinak je navratova hodnota -1.
//

function isShoda(vz, txt) {
	txt = txt.toLowerCase()
	vz = vz.toLowerCase()
	i = vz.length
	j = txt.length

	if (i == 0 || j == 0) return -1;
	i--;
	j--;

	nCmpReg = 0;

	while (i >= 0 && j >= 0) {
		if (vz.charAt(i) == "]") {
			i--;
			quit = 1;
			while (i >= 0 && vz.charAt(i) != "[") {
				if (vz.charAt(i) == txt.charAt(j)) {
					quit = 0;
					aCmpReg[nCmpReg] = vz.charAt(i);
					nCmpReg++;
				}
				i--;
			}

			if (quit == 1) return -1;
		} else {
			if (vz.charAt(i) == '-') return j + 1;
			if (vz.charAt(i) != txt.charAt(j)) return -1;
		}
		i--;
		j--;
	}
	if (i < 0 && j < 0) return 0;
	if (vz.charAt(i) == '-') return 0;

	return -1
}

//
// Transformace: ďi,ťi,ňi,ďe,ťe,ňe ... di,ti,ni,dě,tě,ně
//               + "ch" -> "#"
//

function Xdetene(txt2) {
	XdeteneRV = "";
	for (XdeteneI = 0; XdeteneI < txt2.length - 1; XdeteneI++) {
		if (txt2.charAt(XdeteneI) == "ď" && (txt2.charAt(XdeteneI + 1) == "e" || txt2.charAt(XdeteneI + 1) == "i" || txt2.charAt(XdeteneI + 1) == "í")) {
			XdeteneRV += "d";
			if (txt2.charAt(XdeteneI + 1) == "e") {
				XdeteneRV += "ě";
				XdeteneI++;
			}
		} else if (txt2.charAt(XdeteneI) == "ť" && (txt2.charAt(XdeteneI + 1) == "e" || txt2.charAt(XdeteneI + 1) == "i" || txt2.charAt(XdeteneI + 1) == "í")) {
			XdeteneRV += "t";
			if (txt2.charAt(XdeteneI + 1) == "e") {
				XdeteneRV += "ě";
				XdeteneI++;
			}
		} else if (txt2.charAt(XdeteneI) == "ň" && (txt2.charAt(XdeteneI + 1) == "e" || txt2.charAt(XdeteneI + 1) == "i" || txt2.charAt(XdeteneI + 1) == "í")) {
			XdeteneRV += "n";
			if (txt2.charAt(XdeteneI + 1) == "e") {
				XdeteneRV += "ě";
				XdeteneI++;
			}
		} else XdeteneRV += txt2.charAt(XdeteneI)
	}

	if (XdeteneI == txt2.length - 1) XdeteneRV += txt2.charAt(XdeteneI)

	return XdeteneRV;
}

//
// Transformace: di,ti,ni,dě,tě,ně ... ďi,ťi,ňi,ďe,ťe,ňe
//

function Xedeten(txt2) {
	XdeteneRV = "";
	for (XdeteneI = 0; XdeteneI < txt2.length - 1; XdeteneI++) {
		if (txt2.charAt(XdeteneI) == "d" && (txt2.charAt(XdeteneI + 1) == "ě" || txt2.charAt(XdeteneI + 1) == "i")) {
			XdeteneRV += "ď";
			if (txt2.charAt(XdeteneI + 1) == "ě") {
				XdeteneRV += "e";
				XdeteneI++;
			}
		} else if (txt2.charAt(XdeteneI) == "t" && (txt2.charAt(XdeteneI + 1) == "ě" || txt2.charAt(XdeteneI + 1) == "i")) {
			XdeteneRV += "ť";
			if (txt2.charAt(XdeteneI + 1) == "ě") {
				XdeteneRV += "e";
				XdeteneI++;
			}
		} else if (txt2.charAt(XdeteneI) == "n" && (txt2.charAt(XdeteneI + 1) == "ě" || txt2.charAt(XdeteneI + 1) == "i")) {
			XdeteneRV += "ň";
			if (txt2.charAt(XdeteneI + 1) == "ě") {
				XdeteneRV += "e";
				XdeteneI++;
			}
		} else XdeteneRV += txt2.charAt(XdeteneI)
	}

	if (XdeteneI == txt2.length - 1) XdeteneRV += txt2.charAt(XdeteneI)

	return XdeteneRV;
}



//
// Funkce pro sklonovani
//

function CmpFrm(txt) {
	CmpFrmRV = "";
	for (CmpFrmI = 0; CmpFrmI < txt.length; CmpFrmI++)
	if (txt.charAt(CmpFrmI) == "0") CmpFrmRV += aCmpReg[0];
	else if (txt.charAt(CmpFrmI) == "1") CmpFrmRV += aCmpReg[1];
	else if (txt.charAt(CmpFrmI) == "2") CmpFrmRV += aCmpReg[2];
	else CmpFrmRV += txt.charAt(CmpFrmI);

	return CmpFrmRV;
}

// Funkce pro sklonovani slova do daneho podle
// daneho vzoru

function Sklon(nPad, vzndx, txt) {
	var rv, nnn, ndx1, ndx2;

	if (vzndx >= vzor.length || vzndx < 0) return "???";

	txt3 = Xedeten(txt);
	kndx = isShoda(vzor[vzndx][1], txt3)
	if (kndx < 0 || nPad < 1 || nPad > 14) //8-14 je pro plural
	return "???";

	if (vzor[vzndx][nPad] == "?") return "?";

	if (!isDbgMode & nPad == 1) // 1. pad nemenime
	rv = Xdetene(txt3);
	else rv = LeftStr(kndx, txt3) + '-' + CmpFrm(vzor[vzndx][nPad]);

	if (isDbgMode) //preskoceni filtrovani
	return rv

	// Formatovani zivotneho sklonovani
	// - nalezeni pomlcky
	for (nnn = 0; nnn < rv.length; nnn++)
	if (rv.charAt(nnn) == "-") break;

	ndx1 = nnn;

	// - nalezeni lomitka
	for (nnn = 0; nnn < rv.length; nnn++)
	if (rv.charAt(nnn) == "/") break;

	ndx2 = nnn;


	if (ndx1 != rv.length && ndx2 != rv.length) {
		if (zivotne)
		// "text-xxx/yyy" -> "textyyy"
		rv = LeftStr(ndx1, rv) + RightStr(ndx2 + 1, rv);
		else
		// "text-xxx/yyy" -> "text-xxx"
		rv = LeftStr(ndx2, rv);
	}


	// vypusteni pomocnych znaku
	txt3 = ""
	for (nnn = 0; nnn < rv.length; nnn++)
	if (!(rv.charAt(nnn) == '-' || rv.charAt(nnn) == '/')) txt3 += rv.charAt(nnn);

	rv = Xdetene(txt3);

	return rv;
	//  return LeftStr( kndx, txt ) + vzor[vzndx][nPad];
}

//
// Funkce pro praci s retezci
//

// - levy retezec do indexu n (bez tohoto indexu)

function LeftStr(n, txt) {
	rv = ""
	for (i = 0; i < n && i < txt.length; i++)
	rv += txt.charAt(i)

	return rv
}

// - pravy retezec od indexu n (vcetne)

function RightStr(n, txt) {
	rv = ""
	for (i = n; i < txt.length; i++)
	rv += txt.charAt(i)

	return rv
}

// Rozdeleni textu na slova

function TxtSplit(txt) {
	var skp = 1;
	var rv = new Array();
	var acc;

	rvx = 0;
	acc = "";

	for (i = 0; i < txt.length; i++) {
		if (txt.charAt(i) == ' ') {
			if (skp) continue;
			skp = 1;
			rv[rvx++] = acc;
			acc = "";
			continue;
		}
		skp = 0;
		acc += txt.charAt(i);
	}
	if (!skp) rv[rvx++] = acc;

	return rv;
}

//
//  Pomocne formatovaci funkce
//

function wr0(txt) {
	document.write(txt)
}

function wr(txt) {
	document.write("<br>" + txt)
}

function bwr(txt) {
	document.write("<b><br>" + txt + "</b>")
}

padQst = new Array("Kdo/Co?   ", "Bez koho/čeho?", "Komu/čemu?    ", "Koho/Co?     ", "Oslovení:   ", "O kom/čem?    ", "S kým/čím?      ")

function vysklonuj(slovo) {
	bwr(slovo)
	for (ii = 0; ii < vzor.length; ii++)
	if (isShoda(vzor[ii][1], slovo) >= 0) break;

	if (ii >= vzor.length) {
		wr("&nbsp;&nbsp;Sorry, nenasel jsem vzor.");
		return;
	}

	wr("Rod:" + vzor[ii][0])
	wr0("<table>");
	for (jj = 1; jj < 8; jj++) {
		wr0("<tr><td>&nbsp;&nbsp;</td><td>" + padQst[jj - 1] + "</td><td>" + Sklon(jj, ii, slovo) + "</td>");
		wr0("    <td>" + Sklon(jj + 7, ii, slovo) + "</td></tr>");
	}
	wr0("</table>");
}

astrTvar = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "")

function SklFmt(astrTvar) {
	v2rv = "\nRod:" + astrTvar[0];
	for (jj = 1; jj < 8; jj++) {
		v2rv += "\n" + padQst[jj - 1] + "\t " + astrTvar[jj];
		v2rv += "\t " + astrTvar[jj + 7];
	}
	return v2rv
}

// Sklonovani podle standardniho seznamu pripon

function SklStd(slovo, ii) {
	var jj;

	if (ii < 0 || ii > vzor.length) astrTvar[0] = "!!!???";

	// - seznam nedoresenych slov
	for (jj = 0; jj < v0.length; jj++)
	if (isShoda(v0[jj], slovo) >= 0) {
		str = "Seznam výjimek [" + jj + "]. "

		console.log(str + "Lituji, toto slovo zatím neumím správně vyskloňovat.");
		return;
	}

	// nastaveni rodu
	astrTvar[0] = vzor[ii][0];

	// vlastni sklonovani
	for (jj = 1; jj < 15; jj++)
	astrTvar[jj] = Sklon(jj, ii, slovo);

	// - seznam nepresneho sklonovani
	for (jj = 0; jj < v3.length; jj++)
	if (isShoda(v3[jj], slovo) >= 0) {
		console.log("Pozor, v některých pádech nemusí být skloňování tohoto slova přesné.");
		return;
	}

	//  return SklFmt( astrTvar );
}

// Pokud je index>=0, je slovo výjimka ze seznamu "vx"(v10,...), definovaného výše.

function NdxInVx(vx, slovo) {
	for (vxi = 0; vxi < vx.length; vxi++) {
		if (slovo == vx[vxi]) return vxi;
	}
	return -1;
}

// Pokud je index>=0, je slovo výjimka ze seznamu "vx", definovaného výše.

function ndxV1(slovo) {
	for (v1i = 0; v1i < v1.length; v1i++)
	if (slovo == v1[v1i][0]) return v1i;

	return -1;
}

function StdNdx(slovo) {
	for (iii = 0; iii < vzor.length; iii++) {
		// filtrace rodu
		if (PrefRod.charAt(0) != "0" && PrefRod.charAt(0) != vzor[iii][0].charAt(0)) continue;

		if (isShoda(vzor[iii][1], slovo) >= 0) break;
	}

	if (iii >= vzor.length) return -1;

	return iii;
}

// Sklonovani podle seznamu vyjimek typu V1

function SklV1(slovo, ii) {
	SklStd(v1[ii][1], StdNdx(v1[ii][1]));
	astrTvar[1] = slovo; //1.p nechame jak je
	astrTvar[4] = v1[ii][2];
}

function skl2(slovo) {
	astrTvar[0] = "???";
	for (ii = 1; ii < 15; ii++)
	astrTvar[ii] = "";

	flgV1 = ndxV1(slovo);

	if (flgV1 >= 0) {
		slovoV1 = slovo;
		slovo = v1[flgV1][1];
	}
	//  if( ii>=0 )
	//  {
	//    astrTvar[1] = "v1: " + ii;
	//    SklV1( slovo, ii );
	//    return SklFmt( astrTvar );
	//    return 0;
	//  }

	slovo = Xedeten(slovo);
	vNdx = 0;

	// Pretypovani rodu?
	if (NdxInVx(v10, slovo) >= 0) PrefRod = "m";
	else if (NdxInVx(v11, slovo) >= 0) PrefRod = "ž";
	else if (NdxInVx(v12, slovo) >= 0) PrefRod = "s";

	// Nalezeni vzoru
	ii = StdNdx(slovo);

	if (ii < 0) {
		console.log("Chyba: proto toto slovo nebyl nalezen vzor.");
		return {
			error: "Chyba: proto toto slovo nebyl nalezen vzor."
		}; //    return "\n  Sorry, nenasel jsem vzor.";
	}

	// Vlastni sklonovani
	SklStd(slovo, ii);

	if (flgV1 >= 0) {
		astrTvar[1] = slovoV1; //1.p nechame jak je
		astrTvar[4] = v1[flgV1][2];
	}
	return 0; //return SklFmt( astrTvar ); //  return "vzor: "+vzor[ii][1];
}
const gulp = require("gulp");//Så henter den Gulp og selv finder den i Node mappen.
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");//rename omdøber filen til noget andet.
const connect = require("gulp-connect");


function html(done){
	gulp.src("./src/html/templates/*.ejs") //Gulp skal hente en "ting" et sted fra. * - betyder der kan stå hvad som helst.
		.pipe(ejs())//Pipe transportere noget fra et sted....
		.pipe(rename(function(path){
			path.extname = ".html"//Fortæller at filen skal hedde .html
		}))
		.pipe(gulp.dest("./dist"))//... Til et andet sted. Til mappen dist.
		.pipe(connect.reload());
	done();
}

function watchhtml(done){//Holder øje med html filerne, hvis der laves ændringer.
	gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false}, html); //** - alle mapper i html * - alle filer med .ejs
}

gulp.task("dev", function(done){//Gulp packgets gør - function .....
	watchhtml();//Kører functionen 
	connect.server({ //Bruger connect packget
		livereload: true,//Reload browseren, ved ændringer
		root: "dist"//Hvor skal serveren eksistere
	})
	done();
}); 



/* gulp.task("hej", function(done){ //Gulp gør noget - callback function.
	console.log("Hej verden");
	done();
}); */


//2 Måder at skrive javascript på - 1: asynkrom programmeing. (Når det ikke sker sammentidig) 2: 
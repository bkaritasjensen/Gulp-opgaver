const gulp = require("gulp");//Så henter den Gulp og selv finder den i Node mappen.
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");//rename omdøber filen til noget andet.
const connect = require("gulp-connect");
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

sass.compiler = require("node-sass");

function html(done){
	gulp.src("./src/html/templates/*.ejs") //Gulp skal hente en "ting" et sted fra. * - betyder der kan stå hvad som helst.
		.pipe(ejs())//Pipe transportere noget fra et sted....
		.pipe(rename(function(path){
			if (path.basename != "index"){//Hvis fil navnet ikke er lig med index,
				path.dirname = path.basename; //Ligger den ind i mappe som hedder basename,
				path.basename = "index";//Selve filen skal hedde "index",
			}
			path.extname = ".html";//Fortæller at filen skal hedde .html
		}))
		.pipe(gulp.dest("./dist"))//... Til et andet sted. Til mappen dist.
		.pipe(connect.reload());
	done();
}

function watchhtml(){//Holder øje med html filerne, hvis der laves ændringer.
	gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false}, html); //** - alle mapper i html * - alle filer med .ejs
}

function scss(done){
	gulp.src("./src/css/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./dist/assets/css"))
		.pipe(connect.reload());
	done();
}

function watchScss(){
	gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}


function javaScript(done){
	gulp.src("./src/js/**/*.js")
		.pipe(babel({//Laver et rør hvor den skal køre igennem
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest("./dist/assets/js"))//og hvor røret skal slutte.
		.pipe(connect.reload());//Reloader javaScript
	done();
}

function watchJavaScript(){
	gulp.watch("./src/js/**/*.js", { ignoreInitial: false }, javaScript);//False gør at det, den gør det lige så snart den starter og ikke kun når den kører.
}

function json(done){
	gulp.src("./src/json/*.json")
		.pipe(gulp.dest("./dist/data"))//dest = destanation.
		.pipe(connect.reload());
	done();
}

function watchjson(){
	gulp.watch("./src/json/**/*.json", { ignoreInitial: false}, json);
}

function images(done){
	gulp.src("./src/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/assets/images"))
		.pipe(connect.reload());
	done();
}

function watchImages(){
	gulp.watch("./src/images/*", { ignoreInitial: false }, images);
}

gulp.task("dev", function(done){//Gulp packgets gør - function .....
	watchhtml();//Kører functionen 
	watchScss();
	watchJavaScript();
	watchjson();
	watchImages();
	connect.server({ //Bruger connect packget
		livereload: true,//Reload browseren, ved ændringer
		root: "dist"//Hvor skal serveren eksistere
	})
	done();
}); 

gulp.task("build", function(done) {
	html();
	scss();
	javaScript();
	json();
	images();
	done();
});
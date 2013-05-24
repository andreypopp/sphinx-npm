#!/usr/bin/env node
var spawn = require('child_process').spawn,
	exists = require('fs').existsSync,
	path = require('path'),
	dirname = path.dirname,
	join = path.join,
	relative = path.relative;

exports.main = function (srcdir) {
	var cmdArgs = Array.prototype.slice.call(arguments, 1);
	cmdArgs.splice(cmdArgs.length - 1, 0, srcdir);

	var packageFilename;
	if (exists(join(srcdir, "package.json"))) {
		packageFilename = join(srcdir, "package.json");
	} else if (exists(join(dirname(srcdir), "package.json"))) {
		packageFilename = join(dirname(srcdir), "package.json");
	} else {
		console.error("can't find package.json");
		process.exit(1);
	}

	var pkg = require('./' + relative(__dirname, packageFilename)),
			author = pkg.author.name || pkg.author,
			project = pkg.name,
			version = pkg.version,
			release = version,
			args = [
				"-Dproject=" + project,
				"-Dversion=" + version,
				"-Drelease=" + release,
				"-Dauthor="  + author,
				"-Dmaster_doc=README",
				"-bsinglehtml",
				"-C",
			].concat(cmdArgs),
			ps = spawn("sphinx-build", args);

	return ps;
};

if (require.main === module) {
	var args = process.argv.slice(2);
	args.unshift(args.splice(args.length - 2, 1)[0]);

	var ps = exports.main.apply(null, args);
	ps.stdout.pipe(process.stdout);
	ps.stderr.pipe(process.stderr);
	ps.on('exit', function (code) { process.exit(code); });
}

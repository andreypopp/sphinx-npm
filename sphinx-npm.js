#!/usr/bin/env node
var spawn = require('child_process').spawn,
		join = require('path').join;

exports.main = function (srcdir) {
	var cmdArgs = Array.prototype.slice.call(arguments, 1);
	cmdArgs.splice(cmdArgs.length - 1, 0, srcdir);
	var pkg = require(join(srcdir,  "package.json")),
			author = pkg.author.name || pkg.author,
			project = pkg.name,
			version = pkg.version,
			release = version,
			q = function(v) {
				return "\"" + v + "\"";
			},
			args = [
				"-Dproject=" + q(project),
				"-Dversion=" + q(version),
				"-Drelease=" + q(release),
				"-Dauthor="  + q(author),
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

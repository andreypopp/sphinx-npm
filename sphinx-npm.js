#!/usr/bin/env node
var spawn = require('child_process').spawn,
		join = require('path').join;

exports.main = function (srcdir) {
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
			].concat(Array.prototype.slice.call(arguments, 0)),
			ps = spawn("sphinx-build", args);

	return ps;
};

if (require.main === module) {
	var ps = exports.main.apply(null, process.argv.slice(2));
	ps.stdout.pipe(process.stdout);
	ps.stderr.pipe(process.stderr);
	ps.on('exit', function (code) { process.exit(code); });
}

/**
 * Even the simplest shell script fails in Windows, hence this file.
 *
 * The intention here is to only run `patch-package` during local installation, IE. during
 * development of the library and not upon installation by the users of the library.
 */
if (process.cwd() === process.env.INIT_CWD) {
  require("patch-package");
}

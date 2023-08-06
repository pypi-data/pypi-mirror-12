JarManifest
===========
Extract manifest information from Java library files (jars).

Description
-----------
Use this library to look at jar META-INF/MANIFEST files and extract Implementation-Title, and Implementation-Version. Based on the specification of jars found [here](http://docs.oracle.com/javase/1.4.2/docs/guide/jar/jar.html#Notes)

Usage
-----
| $ python3
| >>> import manifest
| >>> manifest.getAttributes('/tmp/spring/META-INF/MANIFEST.MF')
| [{'implementationtitle': 'org.springframework.core', 'implementationversion': '3.1.3.RELEASE'}]


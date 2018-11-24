Examples
---------


grep (see https://www.cyberciti.biz/faq/grep-regular-expressions/)
=====

* Color

grep --color

* AND

grep word1 file | grep word2

* OR:

grep -E 'word1|word2' filename
### OR ###
egrep 'word1|word2' filename

egrep -i '^(linux|unix)' filename

* Match IP address:

egrep '[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}' filename


Generate and Send Data
============================

## About

Simple cli to send and retrieve data, kind of rough around the edges but it does provide a quick way to emulate random log messages to miscellaneous tcp/udp endpoints such as logstash or rsyslog.


## IMPORTANT :: Security
The way gensend provides hooks to generate data makes it very unsafe to provide a generic interface to allow arbitrary input from untrusted sources. Don't do that, please.


## Syntax
Syntax is simple, each `pattern` is a string. You may use expressions anywhere within the string in the form of `%{api_call_name}` providing arguments is possible using `%{api_call_name:arg1,arg2}`.

For sending data use `gensend send` with the last argument expected to be a destination in the form of `scheme://netloc/path;parameters?query#fragment`. Currently only raw tcp/udp supported i.e.: tcp://127.0.0.1:8000, udp://127.0.0.1:8000.

#### Why?
The pattern syntax was inspired from grok patterns, since that is what I was going to be modeling most the data I generated around. I found a couple cases where I wanted to nest an expression so I added support for that. I don't think I'll be adding much more because it might make more sense to just use python `ast` package and require actual python syntax and walk that, or use jinja2 templating with some wrappers for data providers if it gets much more complicated as the parser is an afternoon hack.


## API
All of the api calls available in Faker for python at http://www.joke2k.net/faker/ are available as expressions %{faker_name} as well as some additional ones. Feel free to dig through gensend/providers/common for some additional functions.

You may also extend it using a providers file using the -l flag, gensend will exec the file (I know.. I know.., it's pretty convenient though) and slurp in anything that is a "ProviderList". Example file myproviders.py:

  ```python
  from gensend.providers import ProviderList, Provider


  class MyFirstProvider(Provider):
      def myhellofunc(self, *args):
          return 'myhellofunc'


  class MySecondProvider(Provider):
      def secondfunc(self, *args):
          return 'secondfunc: ' + str(args)


  MyProviderList = ProviderList([MyFirstProvider(), MySecondProvider()])
  ```

Now you may call them from patterns:

  ```
  $ gensend --number 5 -l myproviders.py gen 'Func1: "%{myhellofunc}" Func2: "%{secondfunc:foo,bar}'
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  ```


## Examples

Basic usage:

  ```
  $ gensend gen 'My name is %{name}. Hello.'
  My name is Sarita Ferry. Hello.
  ```

Repeat output with `--number N` flag:

  ```
  $ gensend --number 5 gen 'My name is %{name}. Hello.'
  My name is Dwight Wisozk. Hello.
  My name is Jamil Abshire. Hello.
  My name is Helga Grant. Hello.
  My name is Ms. Jessie Abshire. Hello.
  My name is Zelma Ledner DVM. Hello.
  ```

Format the output in json with `--format, -f FMT` flag:

  ```
  $ gensend -f json --number 5 gen 'My name is %{name}. Hello.'
  [
    "My name is Delos Rodriguez. Hello.",
    "My name is Roy White. Hello.",
    "My name is Mr. Montel O'Connell Sr.. Hello.",
    "My name is Zaniyah Hand. Hello.",
    "My name is Wyatt Beier. Hello."
  ]
  ```

Nested expressions:

  ```
  $ gensend --number 5 gen 'My choice is "%{choice:%{address},%{name},%{ipv4},%{name}}"'
  My choice is "Evelena Predovic DDS"
  My choice is "Dr. Christoper Feeney"
  My choice is "28.139.1.107"
  My choice is "59303 Nobie Roads
  New Makailabury, MI 90325"
  My choice is "020 Rath Loop
  Kuhlmanside, SC 49924"
  ```

Send your data somewhere:

  ```
  $ netcat -t -v -l -p 50000|awk '{print "[TCP] " $0}'&
  [1] 90965
  $ gensend --number 5 -l myproviders.py send 'Func1: "%{myhellofunc}" Func2: "%{secondfunc:foo,bar}%{LF}' 'tcp://127.0.0.1:50000'
  Connection from 127.0.0.1:55490
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')

  [TCP] Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')

  [TCP] Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')

  [TCP] Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')

  [TCP] Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')

  [TCP] Func1: "myhellofunc" Func2: "secondfunc: ('foo', 'bar')
  [1]+  Done                    netcat -t -v -l -p 50000 | awk '{print "[TCP] " $0}'
  ```


## Help Text

```
usage: gensend [-h] [--load-providers PROVIDERS] [--patterns PATTERNS]
               [--format FORMAT] [--debug] [--number NUMBER] [--persistent]
               [--noseed | --seed SEED]
               {info,gen,send} ...

optional arguments:
  -h, --help            show this help message and exit
  --load-providers PROVIDERS, -l PROVIDERS
                        an optional file path or importable module name that
                        may be included and added to the list of default
                        providers.
  --patterns PATTERNS, -p PATTERNS
                        optional file containing pattern strings separated by
                        new lines when .txt, or a json array of patterns when
                        .json
  --format FORMAT, -f FORMAT
                        format for output data, one of txt, json or csv
                        default: txt
  --debug, -d           debug flag for additional troubleshooting information
  --number NUMBER       number of times to generate pattern, default: 1
  --persistent          when sending multiple message keep the connection
                        open. note when using this option you should terminate
                        your pattern if needed. default: true
  --noseed              do not seed the pseudo-random number generator to
                        produce non-deterministic data
  --seed SEED           seed the pseudo-random number generator, default: 1

commands:
  {info,gen,send}
    gen                 ex: gensend gen pattern1 ... patternN
    send                ex: gensend send pattern1 ... patternN
                        scheme://netloc/path;parameters?query#fragment
```


## Installation

With Pip:

  ```
  $ pip install https://github.com/cstockton/py-gensend.git
  ```


Manual Install:

  ```
  $ cd /tmp
  $ git clone https://github.com/cstockton/py-gensend.git
  $ cd ./py-gensend
  $ make install
  ```


Dev Install:

  ```
  $ cd /tmp
  $ git clone https://github.com/cstockton/py-gensend.git
  $ make build && make test
  ```

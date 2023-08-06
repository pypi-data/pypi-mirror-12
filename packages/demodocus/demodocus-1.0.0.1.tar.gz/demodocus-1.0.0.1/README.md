# demodocus

**demodocus** is Python CLI program to quickly check synchronization maps.

* Version: 1.0.0
* Date: 2015-12-12
* Developer: [Alberto Pettarin](http://www.albertopettarin.it/)
* License: the MIT License (MIT)
* Contact: [click here](http://www.albertopettarin.it/contact.html)

## Installation

### Using pip

1. Open a console and type:

    ```bash
    $ [sudo] pip install demodocus
    ```

2. That's it! Just run without arguments (or with `-h` or `--help`) to get the manual:

    ```bash
    $ demodocus
    ```

Make sure to have `ffmpeg` installed and available on your `PATH` environment variable, see below.

### From source code

1. Get the source code:

    * clone this repo with `git`:

        ```bash
        $ git clone https://github.com/pettarin/demodocus.git
        ```

    * or download the [latest release](https://github.com/pettarin/demodocus/releases) and uncompress it somewhere,
    * or download the [current master ZIP](https://github.com/pettarin/demodocus/archive/master.zip) and uncompress it somewhere.

2. Open a console and enter the `demodocus` (cloned) directory:

    ```bash
    $ cd /path/to/demodocus
    ```

3. Install the requirements:

    ```bash
    $ [sudo] pip -r requirements.txt
    ```

4. That's it! Just run without arguments (or with `-h` or `--help`) to get the manual:

    ```bash
    $ python -m demodocus
    ```

Make sure to have `ffmpeg` installed and available on your `PATH` environment variable, see below.


### Dependencies

* Python, version 2.7.x or 3.4.x (or above)

* `ffmpeg`: download it from [https://www.ffmpeg.org/](https://www.ffmpeg.org/) or install it with your packet manager

* `pyaudio` : install it via `pip`:

    ```bash
    $ [sudo] pip install pyaudio
    ```

    (if a compilation error appears, check that you have the PortAudio 1.9 headers available: in Debian, they are provided by the `portaudio19-dev` package)


## Usage

```
usage: 
  $ demodocus -h
  $ demodocus -a AUDIO -s SYNCMAP [OPTIONS]

description:
  Run an interactive CLI tool to verify that SYNCMAP has a good alignment against AUDIO.
  The sync map file can be in JSON or SSV/SSVH format (auto-detected).

optional arguments:
  -h, --help            show this help message and exit
  -a AUDIO, --audio AUDIO
                        path to the audio file
  -c, --continuous      keep going (default: False)
  -d DURATION, --duration DURATION
                        play audio for max DURATION seconds (default: 2)
  -i INCREMENT, --increment INCREMENT
                        play audio every INCREMENT fragments (default: 1)
  -s SYNCMAP, --syncmap SYNCMAP
                        path to the sync map file
  -v, --version         print version and exit
  -w WAIT, --wait WAIT  wait WAIT seconds before playing the next fragment
                        (default: 0)

examples:

  $ demodocus -a audio.mp3 -s syncmap.json
    Check audio.mp3 against syncmap.json with default parameters (2 seconds, all fragments)

  $ demodocus -a audio.mp3 -s syncmap.ssv
    As above, but the sync map file has SSV format

  $ demodocus -a audio.mp3 -s syncmap.json -d 1
    Play each fragment for max 1 second

  $ demodocus -a audio.mp3 -s syncmap.json -d 3 -i 5
    Play every 5 fragments, for max 3 seconds each

  $ demodocus -a audio.mp3 -s syncmap.json -d 3 -i 5 -w 0.5
    Pause for 0.5 seconds before playing next fragment

  $ demodocus -a audio.mp3 -s syncmap.json -c -i 5 -d 1.5 -w 0.5
    Play every 5 fragments, 1.5 seconds each, continuously, pausing for 0.5 seconds
```


## License

**demodocus** is released under the MIT License.


## Limitations and Missing Features

* The input file must be converted to WAVE before running: slow for very large input files
* Dependency from `ffmpeg`, called via `subprocess` to convert the input file to WAVE
* Dependency from `pyaudio`, which in turns depends on `PortAudio`
* No tests
* No documentation




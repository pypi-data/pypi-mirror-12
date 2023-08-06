Start a multi-user Jupyter Notebook server

Spawns a configurable-http-proxy and multi-user Hub, which authenticates users
and spawns single-user Notebook servers on behalf of users.

## Subcommands

Subcommands are launched as `jupyterhub cmd [args]`. For information on using
subcommand 'cmd', do: `jupyterhub cmd -h`.

token
    Generate an API token for a user

Options
-------

Arguments that take values are actually convenience aliases to full
Configurables, whose aliases are listed on the help line. For more information
on full configurables, see '--help-all'.

```null
--no-db
    disable persisting state database to disk
--generate-config
    generate default config file
--debug
    set log level to logging.DEBUG (maximize logging output)
--base-url=<URLPrefix> (JupyterHub.base_url)
    Default: '/'
    The base URL of the entire application
--config=<Unicode> (JupyterHub.config_file)
    Default: 'jupyterhub_config.py'
    The config file to load
-y <Bool> (JupyterHub.answer_yes)
    Default: False
    Answer yes to any questions (e.g. confirm overwrite)
--log-file=<Unicode> (JupyterHub.extra_log_file)
    Default: ''
    Set a logging.FileHandler on this file.
-f <Unicode> (JupyterHub.config_file)
    Default: 'jupyterhub_config.py'
    The config file to load
--log-level=<Enum> (Application.log_level)
    Default: 30
    Choices: (0, 10, 20, 30, 40, 50, 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL')
    Set the log level by value or name.
--ip=<Unicode> (JupyterHub.ip)
    Default: ''
    The public facing ip of the proxy
--pid-file=<Unicode> (JupyterHub.pid_file)
    Default: ''
    File to write PID Useful for daemonizing jupyterhub.
--port=<Int> (JupyterHub.port)
    Default: 8000
    The public facing port of the proxy
--ssl-key=<Unicode> (JupyterHub.ssl_key)
    Default: ''
    Path to SSL key file for the public facing interface of the proxy
    Use with ssl_cert
--db=<Unicode> (JupyterHub.db_url)
    Default: 'sqlite:///jupyterhub.sqlite'
    url for the database. e.g. `sqlite:///jupyterhub.sqlite`
--ssl-cert=<Unicode> (JupyterHub.ssl_cert)
    Default: ''
    Path to SSL certificate file for the public facing interface of the proxy
    Use with ssl_key
```

Class parameters
----------------

Parameters are set from command-line arguments of the form:
`--Class.trait=value`. This line is evaluated in Python, so simple expressions
are allowed, e.g.:: `--C.a='range(3)'` For setting C.a=[0,1,2].

JupyterHub options
------------------
--JupyterHub.admin_access=<Bool>
    Default: False
    Grant admin users permission to access single-user servers.
    Users should be properly informed if this is enabled.
--JupyterHub.admin_users=<Set>
    Default: set()
    set of usernames of admin users
    If unspecified, only the user that launches the server will be admin.
--JupyterHub.answer_yes=<Bool>
    Default: False
    Answer yes to any questions (e.g. confirm overwrite)
--JupyterHub.authenticator_class=<Type>
    Default: <class 'jupyterhub.auth.PAMAuthenticator'>
    Class for authenticating users.
    This should be a class with the following form:
    - constructor takes one kwarg: `config`, the IPython config object.
    - is a tornado.gen.coroutine
    - returns username on success, None on failure
    - takes two arguments: (handler, data),
      where `handler` is the calling web.RequestHandler,
      and `data` is the POST form data from the login page.
--JupyterHub.base_url=<URLPrefix>
    Default: '/'
    The base URL of the entire application
--JupyterHub.cleanup_proxy=<Bool>
    Default: True
    Whether to shutdown the proxy when the Hub shuts down.
    Disable if you want to be able to teardown the Hub while leaving the proxy
    running.
    Only valid if the proxy was starting by the Hub process.
    If both this and cleanup_servers are False, sending SIGINT to the Hub will
    only shutdown the Hub, leaving everything else running.
    The Hub should be able to resume from database state.
--JupyterHub.cleanup_servers=<Bool>
    Default: True
    Whether to shutdown single-user servers when the Hub shuts down.
    Disable if you want to be able to teardown the Hub while leaving the single-
    user servers running.
    If both this and cleanup_proxy are False, sending SIGINT to the Hub will
    only shutdown the Hub, leaving everything else running.
    The Hub should be able to resume from database state.
--JupyterHub.config_file=<Unicode>
    Default: 'jupyterhub_config.py'
    The config file to load
--JupyterHub.cookie_secret=<Bytes>
    Default: b''
    The cookie secret to use to encrypt cookies.
    Loaded from the JPY_COOKIE_SECRET env variable by default.
--JupyterHub.cookie_secret_file=<Unicode>
    Default: 'jupyterhub_cookie_secret'
    File in which to store the cookie secret.
--JupyterHub.data_files_path=<Unicode>
    Default: '/Users/minrk/dev/jpy/jupyterhub/share/jupyter/hub'
    The location of jupyterhub data files (e.g. /usr/local/share/jupyter/hub)
--JupyterHub.db_kwargs=<Dict>
    Default: {}
    Include any kwargs to pass to the database connection. See
    sqlalchemy.create_engine for details.
--JupyterHub.db_url=<Unicode>
    Default: 'sqlite:///jupyterhub.sqlite'
    url for the database. e.g. `sqlite:///jupyterhub.sqlite`
--JupyterHub.debug_db=<Bool>
    Default: False
    log all database transactions. This has A LOT of output
--JupyterHub.debug_proxy=<Bool>
    Default: False
    show debug output in configurable-http-proxy
--JupyterHub.extra_log_file=<Unicode>
    Default: ''
    Set a logging.FileHandler on this file.
--JupyterHub.extra_log_handlers=<List>
    Default: []
    Extra log handlers to set on JupyterHub logger
--JupyterHub.generate_config=<Bool>
    Default: False
    Generate default config file
--JupyterHub.hub_ip=<Unicode>
    Default: 'localhost'
    The ip for this process
--JupyterHub.hub_port=<Int>
    Default: 8081
    The port for this process
--JupyterHub.hub_prefix=<URLPrefix>
    Default: '/hub/'
    The prefix for the hub server. Must not be '/'
--JupyterHub.ip=<Unicode>
    Default: ''
    The public facing ip of the proxy
--JupyterHub.jinja_environment_options=<Dict>
    Default: {}
    Supply extra arguments that will be passed to Jinja environment.
--JupyterHub.last_activity_interval=<Int>
    Default: 300
    Interval (in seconds) at which to update last-activity timestamps.
--JupyterHub.log_datefmt=<Unicode>
    Default: '%Y-%m-%d %H:%M:%S'
    The date format used by logging formatters for %(asctime)s
--JupyterHub.log_format=<Unicode>
    Default: '[%(name)s]%(highlevel)s %(message)s'
    The Logging format template
--JupyterHub.log_level=<Enum>
    Default: 30
    Choices: (0, 10, 20, 30, 40, 50, 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL')
    Set the log level by value or name.
--JupyterHub.pid_file=<Unicode>
    Default: ''
    File to write PID Useful for daemonizing jupyterhub.
--JupyterHub.port=<Int>
    Default: 8000
    The public facing port of the proxy
--JupyterHub.proxy_api_ip=<Unicode>
    Default: 'localhost'
    The ip for the proxy API handlers
--JupyterHub.proxy_api_port=<Int>
    Default: 0
    The port for the proxy API handlers
--JupyterHub.proxy_auth_token=<Unicode>
    Default: ''
    The Proxy Auth token.
    Loaded from the CONFIGPROXY_AUTH_TOKEN env variable by default.
--JupyterHub.proxy_check_interval=<Int>
    Default: 30
    Interval (in seconds) at which to check if the proxy is running.
--JupyterHub.proxy_cmd=<Unicode>
    Default: 'configurable-http-proxy'
    The command to start the http proxy.
    Only override if configurable-http-proxy is not on your PATH
--JupyterHub.reset_db=<Bool>
    Default: False
    Purge and reset the database.
--JupyterHub.spawner_class=<Type>
    Default: <class 'jupyterhub.spawner.LocalProcessSpawner'>
    The class to use for spawning single-user servers.
    Should be a subclass of Spawner.
--JupyterHub.ssl_cert=<Unicode>
    Default: ''
    Path to SSL certificate file for the public facing interface of the proxy
    Use with ssl_key
--JupyterHub.ssl_key=<Unicode>
    Default: ''
    Path to SSL key file for the public facing interface of the proxy
    Use with ssl_cert
--JupyterHub.tornado_settings=<Dict>
    Default: {}

Spawner options
---------------
--Spawner.args=<List>
    Default: []
    Extra arguments to be passed to the single-user server
--Spawner.cmd=<List>
    Default: ['jupyterhub-singleuser']
    The command used for starting notebooks.
--Spawner.debug=<Bool>
    Default: False
    Enable debug-logging of the single-user server
--Spawner.env_keep=<List>
    Default: ['PATH', 'PYTHONPATH', 'CONDA_ROOT', 'CONDA_DEFAULT_ENV', 'VI...
    Whitelist of environment variables for the subprocess to inherit
--Spawner.http_timeout=<Int>
    Default: 10
    Timeout (in seconds) before giving up on a spawned HTTP server
    Once a server has successfully been spawned, this is the amount of time we
    wait before assuming that the server is unable to accept connections.
--Spawner.ip=<Unicode>
    Default: 'localhost'
    The IP address (or hostname) the single-user server should listen on
--Spawner.notebook_dir=<Unicode>
    Default: ''
    The notebook directory for the single-user server
    `~` will be expanded to the user's home directory
--Spawner.poll_interval=<Int>
    Default: 30
    Interval (in seconds) on which to poll the spawner.
--Spawner.start_timeout=<Int>
    Default: 60
    Timeout (in seconds) before giving up on the spawner.
    This is the timeout for start to return, not the timeout for the server to
    respond. Callers of spawner.start will assume that startup has failed if it
    takes longer than this. start should return when the server process is
    started and its location is known.

LocalProcessSpawner options
---------------------------
--LocalProcessSpawner.INTERRUPT_TIMEOUT=<Int>
    Default: 10
    Seconds to wait for process to halt after SIGINT before proceeding to
    SIGTERM
--LocalProcessSpawner.KILL_TIMEOUT=<Int>
    Default: 5
    Seconds to wait for process to halt after SIGKILL before giving up
--LocalProcessSpawner.TERM_TIMEOUT=<Int>
    Default: 5
    Seconds to wait for process to halt after SIGTERM before proceeding to
    SIGKILL
--LocalProcessSpawner.args=<List>
    Default: []
    Extra arguments to be passed to the single-user server
--LocalProcessSpawner.cmd=<List>
    Default: ['jupyterhub-singleuser']
    The command used for starting notebooks.
--LocalProcessSpawner.debug=<Bool>
    Default: False
    Enable debug-logging of the single-user server
--LocalProcessSpawner.env_keep=<List>
    Default: ['PATH', 'PYTHONPATH', 'CONDA_ROOT', 'CONDA_DEFAULT_ENV', 'VI...
    Whitelist of environment variables for the subprocess to inherit
--LocalProcessSpawner.http_timeout=<Int>
    Default: 10
    Timeout (in seconds) before giving up on a spawned HTTP server
    Once a server has successfully been spawned, this is the amount of time we
    wait before assuming that the server is unable to accept connections.
--LocalProcessSpawner.ip=<Unicode>
    Default: 'localhost'
    The IP address (or hostname) the single-user server should listen on
--LocalProcessSpawner.notebook_dir=<Unicode>
    Default: ''
    The notebook directory for the single-user server
    `~` will be expanded to the user's home directory
--LocalProcessSpawner.poll_interval=<Int>
    Default: 30
    Interval (in seconds) on which to poll the spawner.
--LocalProcessSpawner.start_timeout=<Int>
    Default: 60
    Timeout (in seconds) before giving up on the spawner.
    This is the timeout for start to return, not the timeout for the server to
    respond. Callers of spawner.start will assume that startup has failed if it
    takes longer than this. start should return when the server process is
    started and its location is known.

Authenticator options
---------------------
--Authenticator.whitelist=<Set>
    Default: set()
    Username whitelist.
    Use this to restrict which users can login. If empty, allow any user to
    attempt login.

PAMAuthenticator options
------------------------
--PAMAuthenticator.create_system_users=<Bool>
    Default: False
    If a user is added that doesn't exist on the system, should I try to create
    the system user?
--PAMAuthenticator.encoding=<Unicode>
    Default: 'utf8'
    The encoding to use for PAM
--PAMAuthenticator.service=<Unicode>
    Default: 'login'
    The PAM service to use for authentication.
--PAMAuthenticator.whitelist=<Set>
    Default: set()
    Username whitelist.
    Use this to restrict which users can login. If empty, allow any user to
    attempt login.

Examples
--------

    generate default config file:
    
        jupyterhub --generate-config -f /etc/jupyterhub/jupyterhub.py
    
    spawn the server on 10.0.1.2:443 with https:
    
        jupyterhub --ip 10.0.1.2 --port 443 --ssl-key my_ssl.key --ssl-cert my_ssl.cert


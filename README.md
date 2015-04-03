# Can Haz Cookie?

This is a node.js testing platform for validating assumptions on undocumented cookie security modeling on various browsers. Specifically built to test the concept of a user-initiated click action spawning and popup, thereby marking that domain (b.com) as a trusted 1st party of the main window domain (a.com) for the purpose of reading/writing cookies.

## Dev Setup

```
echo "127.0.0.1 a.com b.com c.com" >> /etc/hosts
# if you have cisco anyconnect VPN client, it maintains another /etc/hosts.ac file that will periodically overwrite
# your /etc/hosts
echo "127.0.0.1 a.com b.com c.com" >> /etc/hosts.ac
```

If you don't yet have node, npm, etc, you can run `dev init` -- this will prompt you to install my [.dotfiles project](https://github.com/atomantic/dotfiles), which contains a lot of OSX developer scaffolding (apps and configs).

## Start the App

`gulp` will run the app and auto-load `a.com:1337`
From there, you can manually navigate to `b.com:1337`, `sub.a.com:1337`, and `sub.b.com:1337`


## Automation

comming soon via `npm test` / `gulp test`

The test sequence we would like to run is this:

1. load a.com and check cookies
2. inside a.com, load b.com as an iframe
3. within b.com, check cookies
4. initiate user click on a.com to spawn a popup window of b.com
5. check cookies in popup (b.com)
6. set cookies in popup (b.com) and close
7. read/write cookies in b.com iframe
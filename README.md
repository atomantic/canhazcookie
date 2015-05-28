# Can Haz Cookie?

This is a node.js testing platform for validating assumptions on undocumented cookie security modeling on various browsers. Specifically built to test the concept of a user-initiated click action spawning and popup, thereby marking that domain (b.com) as a trusted 1st party of the main window domain (a.com) for the purpose of reading/writing cookies.

## Dev Setup

```
echo "127.0.0.1 a.com b.com sso.com" >> /etc/hosts
# if you have cisco anyconnect VPN client, it maintains another /etc/hosts.ac file that will periodically overwrite
# your /etc/hosts
echo "127.0.0.1 a.com b.com sso.com" >> /etc/hosts.ac
```

If you don't yet have node, npm, etc, you can run `dev init` -- this will prompt you to install my [.dotfiles project](https://github.com/atomantic/dotfiles), which contains a lot of OSX developer scaffolding (apps and configs).

## Start the App

`gulp` will run the app and auto-load `a.com:1337`
From there, you can manually navigate to `b.com:1337`, `sso.com:1337`

## Testing

1. Notice on a.com:1337 that the iframe does not have a token_sso value.
2. Notice on b.com:1337 that the iframe does not have a token_sso value.
3. Click the login link on a.com
4. Reload b.com:1337
5. Notice that now, the cookies can be set and read.


## Automation

comming soon via `npm test` / `gulp test`

The test sequence we would like to run is this:

![flow](https://github.com/atomantic/canhazcookie/raw/master/docs/popupsso.png)

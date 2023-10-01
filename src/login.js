export function signIn(e) {
    e.preventDefault();
    chrome.identity.getAuthToken({ interactive: true }, token => {
        if (chrome.runtime.lastError || !token) {
            alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`)
            return
        }

        signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
            .then(res => {
                console.log('signed in!')
            })
            .catch(err => {
                alert(`SSO ended with an error: ${err}`)
            })
    })
}
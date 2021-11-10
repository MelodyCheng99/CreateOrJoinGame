import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '50%',
    left: '50%'
  },
  buttons: {
    borderRadius: '16px',
    margin: '16px 0'
  },
  modals: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: '50%',
    left: '50%',
    height: '200px',
    width: '300px',
    backgroundColor: '#52b2bf',
    borderRadius: '8px'
  }
})

const firebaseConfig = {
  apiKey: "AIzaSyCWyEem2ISTr65hkZa1do5_xT6eGT82UyY",
  authDomain: "createandjoingames.firebaseapp.com",
  databaseURL: "https://createandjoingames-default-rtdb.firebaseio.com",
  projectId: "createandjoingames",
  storageBucket: "createandjoingames.appspot.com",
  messagingSenderId: "489646953572",
  appId: "1:489646953572:web:c5ac23e7bf5ff32ca93b71",
  measurementId: "G-H9JG3CG7JX"
};

function App() {
  const classes = useStyles()
  const [code, setCode] = useState('')
  const [errorCreatingCode, setErrorCreatingCode] = useState(false)

  useEffect(() => {
    initializeApp(firebaseConfig)
  }, [])

  const startGame = () => {
    let creatingCode = ''
    for (let idx = 0; idx < 5; idx++) {
      creatingCode += (Math.floor(Math.random() * 10)).toString()
    }

    const db = getDatabase();
    const codeRef = ref(db);
    get(child(codeRef, 'cardGames/codes')).then((snapshot) => {
      let codes = []
      if (snapshot.exists()) {
        codes = snapshot.val()
      }

      set(ref(db, 'cardGames/'), {
        codes: [...codes, creatingCode]
      }).then(() => {
        setCode(creatingCode)
      }).catch(() => {
        setErrorCreatingCode(true)
      })
    }).catch(() => {
      setErrorCreatingCode(true)
    })
  }

  return (
    <div className={classes.appContainer}>
      {!code && (
        <div className={classes.appContainer}>
          <Button
            className={classes.buttons}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            創建遊戲
          </Button>
          <Button
            className={classes.buttons}
            variant="outlined"
            color="primary"
          // onClick={() => {}}
          >
            加入現有遊戲
          </Button>
        </div>
      )}

      {code && (
        <Typography>
          你的代碼是: {code}
        </Typography>
      )}
    </div>
  );
}

export default App;

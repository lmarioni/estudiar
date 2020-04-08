import React, {useContext} from 'react'

import { Context } from '../Context';

export const Logout = () => {
  const { removeAuth } = useContext(Context)
  removeAuth()

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                <div className="card preview-card text-center" context="main">
                            <h3>:(</h3>
                            <h5 className="mt-2" style={{fontWeight: 100}}>Te vamos a extrañar...</h5>
                            <form action="https://www.btcj.com.ar/sitio/login.php" method="POST">
                                <input type="hidden" name="vuelta" value="https://estudiar.btcj.com.ar/" />
                                <button type="submit" class="btn btn-primary mt-3">
                                Ingresar
                                </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

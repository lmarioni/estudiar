import React, {useContext} from 'react'
import { Link } from "@reach/router";

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
                                <Link to="/auth" class="btn btn-primary mt-3">
                                Ingresar
                                </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./styles.scss";


class ImageProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imagenActual: props.imagenActual,
      imageLoading: false,
      resultado: false,
      resultadoMessage: '',
      resultadoColor: '',
      src: null,
      crop: {
        unit: "%",
        width: 50,
        aspect: 5 / 5
      }
    };
  }

  handleClose = () => this.setState({ showModal: false });
  handleShow = () => this.setState({ showModal: true });

  onSelectFile = e => {
      this.setState({
        resultado: false,
        resultadoMessage: '',
        resultadoColor: '',
      })
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.handleShow();
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
    //   console.log(croppedImageUrl);
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
        //   console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({ blobFile: blob }); // Set blob image inside the state here
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  onFileSave() {
    this.setState({
      imageLoading: true
    });
    this.handleClose();
    const { blobFile } = this.state;
    const newImage = new File([blobFile], blobFile.name, {
      type: blobFile.type
    });
    let fd = new FormData();
    fd.append("fichero", newImage);
    fd.append("idcurso", this.props.idCurso);

    this.setState({
      imagenActual: blobFile
    });

    fetch("http://btcj.com.ar/api/imagen.php", {
      method: "POST",
      body: fd
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === "success") {
          this.setState({
            imagenActual: response.urlImagen,
            imageLoading: false,
            resultadoMessage: 'Excelente! Cambiaste tu icono.',
            resultado: true,
            resultadoColor: 'text-success'
          });
        } else {
          this.setState({
            resultadoColor: 'text-danger',
            resultadoMessage: response.message,
            resultado: true,
            imageLoading: false
          });
        }
      });
  }

  render() {
    const { crop, src } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="card preview-card" context="main">
            <div className="card-description">
              <div className="row">

                <div className="col-md-3">
                  {this.state.imageLoading ? (
                    <img
                      style={{ border: "1px solid #e2e2e2" }}
                      src="https://www.fyff.nl/wp-content/uploads/2018/02/waiting.gif"
                      width="100%"
                      alt=""
                    />
                  ) : (
                    <img src={this.state.imagenActual} width="100%" alt="" />
                  )}
                </div>
                <div className="col-md-9 text-center">
                  <h4 style={{fontWeight: 300}} className="text-center">Editar Icono</h4>
                  <p className="text-center">Puedes elegir una imagen de icono para tu curso</p>
                 
                <input type="file" id="file" onChange={this.onSelectFile} />
                <label for="file">Subir Imagen</label>

                  {/* <input type="file" /> */}

                  {this.state.resultado ? (
                    <h4 className={`${this.state.resultadoColor} text-center mt-4`}>
                      {this.state.resultadoMessage}
                    </h4>
                  ) : (
                    ""
                  )}

                  <Modal
                    show={this.state.showModal}
                    onHide={() => this.handleClose()}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Editar imagen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {src && (
                        <ReactCrop
                          src={src}
                          crop={crop}
                          ruleOfThirds
                          onImageLoaded={this.onImageLoaded}
                          onComplete={this.onCropComplete}
                          onChange={this.onCropChange}
                          width="100%"
                          height="auto"
                        />
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => this.handleClose()}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => this.onFileSave()}
                      >
                        Guardar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              
              </div>
            </div>
          </div>
        </div>

        {/* <h1>editando img: {this.props.idCurso}</h1> */}
        {/* <p>img Actual: {this.props.imagenActual}</p> */}
        {/* {croppedImageUrl && (
            <img alt="Crop" style={{ height:'200px' }} src={croppedImageUrl} />
          )} */}

        {/* <button onClick={ () => this.onFileSave()}>guardar</button> */}
      </React.Fragment>
    );
  }
}

export default ImageProfile;

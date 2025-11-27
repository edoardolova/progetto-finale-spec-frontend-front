export default function EreaderCard({ereader}){
    if (!ereader || !ereader.properties) {
        return null; 
    }
    const getProp = (key) => ereader.properties.find((p) => p.key === key)?.value;
    return(
        <>
            <div className="col-lg-6 col-12 d-flex">
                <div class="card mb-3 pt-3 p-3" >
                    <div class="row g-0">
                        <div class="col-4">
                            <img src={`/${ereader.image}`} class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">{ereader.title}</h5>
                                <p class="card-text text-primary mb-3">{ereader.price}</p>
                                <div className="d-flex">
                                    <p className=" text-secondary w-50"><i class="fa-solid fa-expand fs-4 "></i> <span className="ms-2">{getProp("screenSize")}" </span></p>
                                    <p className="ms-auto text-secondary w-50"><i class="fa-solid fa-database fs-4 "></i> <span className="ms-2">{getProp("internalStorageGb")} GB </span></p>
                                </div>
                                <div className="d-flex">
                                    <p className=" text-secondary w-50"><i class="fa-solid fa-weight-hanging fs-4 "></i> <span className="ms-2">{getProp("weightGr")} g </span></p>
                                    <p className="ms-auto text-secondary w-50"><i class="fa-solid fa-arrow-up-right-dots fs-4 "></i> <span className="ms-2">{getProp("ppi")} ppi </span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export const generosCtrl = {}

generosCtrl.getFantasia = (req, res) => {
    const products = req.session.products
    const productsFiltered = products.filter(e => e.genero === "fantasia")
    res.render("fantasia", { productsFiltered })
  }


generosCtrl.getTerror = (req, res) => {
    const products = req.session.products
    const productsFiltered = products.filter(e => e.genero === "terror")
    res.render("terror", { productsFiltered })
  }

generosCtrl.getInfantil = (req, res) => {
    const products = req.session.products
    const productsFiltered = products.filter(e => e.genero === "infantil")
    res.render("infantil", { productsFiltered })
  }

  generosCtrl.getFiccionLiteratura = (req, res) => {
    const products = req.session.products
    const productsFiltered = products.filter(e => e.genero === "ficción y literatura")
    res.render("ficcion", { productsFiltered })
  }
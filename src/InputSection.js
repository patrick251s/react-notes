function InputSection() {
    return (
      <form>
        <div class="row pb-4">
            <div class="col-sm-5 mx-auto mb-3 mb-sm-0">
                <label for="polishArea" class="col-12 text-danger">Podaj tekst po polsku</label>
                <textarea id="polishArea" class="col-12"></textarea>
            </div>
            <div class="col-sm-5 mx-auto">
                <label for="foreignArea" class="col-12 text-danger">Tekst w języku</label>
                <textarea id="foreignArea" class="col-12"></textarea>
            </div>
            
        </div>
        <input type="submit" class="btn btn-success col-6 col-sm-2 mx-auto" value="Zapisz"/>
      </form>
      
    )
  }
  
  export default InputSection;
  
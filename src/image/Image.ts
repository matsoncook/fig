


export default class  McImage
{
  image : HTMLImageElement ;
  public static createMcImage(source : string,onLoadedFunction : ()=>void)
  {
    var mcImage = new McImage(source);
    if(onLoadedFunction!=null)
    {
      mcImage.onLoadedFunction = onLoadedFunction;

    }

    mcImage.image.addEventListener('load', function()
    {
      //this.mcImage.onLoadedFunction();
    });
    return mcImage.load();
  }
  constructor(private source : string)
  {
    this.image = new Image();
    //this.image.mcImage = this;
    source = source;
  }

 

  load()
  {
    this.image.src = this.source;
    return this;
  };

  onLoadedFunction(){
    //this is mcImage
  };



  isComplete()
  {
    return this.image.complete;
  }


}
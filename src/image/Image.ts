


export default class  McImage
{
  image : HTMLImageElement ;
  public static createMcImage(source : string,onLoadedFunction : ()=>void)
  {
    var mcImage = new McImage(source,onLoadedFunction);
    // if(onLoadedFunction!=null)
    // {
    //   mcImage.onLoadedFunction = onLoadedFunction;

    // }

    // mcImage.image.addEventListener('load', function()
    // {
    //   //this.mcImage.onLoadedFunction();
    // });
    return mcImage.load();
  }
  constructor(private source : string,onLoadedFunction : ()=>void)
  {
    this.image = new Image();

    this.image .addEventListener("load", () => {
      console.log("✅ Image loaded successfully!");
      onLoadedFunction();
    });

    this.image .addEventListener("error", () => {
      console.error("❌ Failed to load image.");
    });
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
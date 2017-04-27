interface ColorArgs
    {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    wasSetByUser?: boolean;
    }


class Color
{
private values: ColorArgs;


/**
 * Represents a color.
 */
constructor( args: ColorArgs )
    {
    if (typeof args.wasSetByUser === 'undefined')
        {
        args.wasSetByUser = false;
        }

    this.values = args;
    }


getCssRepresentation()
    {
    return "rgba(" + this.values.red + ", " + this.values.green + ", " + this.values.blue + ", " + this.values.alpha + ")";
    }


getRed()
    {
    return this.values.red;
    }


setRed( red: number )
    {
    this.values.red = red;
    this.values.wasSetByUser = true;
    }


getGreen()
    {
    return this.values.green;
    }


setGreen( green: number )
    {
    this.values.green = green;
    this.values.wasSetByUser = true;
    }


getBlue()
    {
    return this.values.blue;
    }


setBlue( blue: number )
    {
    this.values.blue = blue;
    this.values.wasSetByUser = true;
    }


getAlpha()
    {
    return this.values.alpha;
    }


setAlpha( alpha: number )
    {
    this.values.alpha = alpha;
    this.values.wasSetByUser = true;
    }


/*
 * Returns a dictionary that has as keys, the components of the final color, red/green/blue/alpha
 *        (red/green/blue varies from 0 to 255, alpha from 0 to 1)
 */
getColor(): ColorArgs
    {
    return this.values;
    }


/*
 * The colors that aren't set by the user aren't saved, they're generated again when the program starts (and change depending on the style used to generate them)
 *
 */
wasSetByUser()
    {
    return this.values.wasSetByUser;
    }


/*
 * To change between fixed/generated type
 */
canBeGenerated( yesNo: boolean )
    {
    this.values.wasSetByUser = !yesNo;
    }
}
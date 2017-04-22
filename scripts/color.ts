class Color
{
wasSetByUser_bool: boolean;
red_int: number;
green_int: number;
blue_int: number;
alpha_float: number;


/**
 * Represents a color.
 */
constructor( red, green, blue, alpha, wasSetByUser? )
    {
    if (typeof wasSetByUser === 'undefined')
        {
        this.wasSetByUser_bool = false;
        }

    else
        {
        this.wasSetByUser_bool = wasSetByUser;
        }

    this.red_int = red;
    this.green_int = green;
    this.blue_int = blue;
    this.alpha_float = alpha;
    }


getCssRepresentation()
    {
    return "rgba(" + this.red_int + ", " + this.green_int + ", " + this.blue_int + ", " + this.alpha_float  + ")";
    }


getRed()
    {
    return this.red_int;
    }


setRed( red )
    {
    this.red_int = red;

    this.wasSetByUser_bool = true;
    }


getGreen()
    {
    return this.green_int;
    }


setGreen( green )
    {
    this.green_int = green;

    this.wasSetByUser_bool = true;
    }


getBlue()
    {
    return this.blue_int;
    }


setBlue( blue )
    {
    this.blue_int = blue;

    this.wasSetByUser_bool = true;
    }


getAlpha()
    {
    return this.alpha_float;
    }


setAlpha( alpha )
    {
    this.alpha_float = alpha;

    this.wasSetByUser_bool = true;
    }


/*
 * Returns a dictionary that has as keys, the components of the final color, red/green/blue/alpha
 *        (red/green/blue varies from 0 to 255, alpha from 0 to 1)
 */
getColor()
    {
    return {
        red   : this.red_int,
        green : this.green_int,
        blue  : this.blue_int,
        alpha : this.alpha_float,
        wasSetByUser : this.wasSetByUser_bool
        };
    }


/*
 * The colors that aren't set by the user aren't saved, they're generated again when the program starts (and change depending on the style used to generate them)
 *
 */
wasSetByUser()
    {
    return this.wasSetByUser_bool;
    }


/*
 * To change between fixed/generated type
 *
 * Arguments:
 *
 *      yesNo (bool)
 */
canBeGenerated( yesNo )
    {
    this.wasSetByUser_bool = !yesNo;
    }
}
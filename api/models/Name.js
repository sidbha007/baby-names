/**
 * Created by sbhask1 on 5/9/15.
 */

module.exports = {
  attributes: {
    nm: {
      type: 'string',
      unique: true,
      required: true
    },

    dc:{
      type: 'string'
    },

    sx: {
      type: 'string',
      enum: ['b', 'g']
    }


  }
};

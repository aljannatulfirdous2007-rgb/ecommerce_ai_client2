const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
    unsubscribedAt: {
      type: Date,
    },
    metadata: {
      source: {
        type: String,
        enum: ['website', 'checkout', 'popup', 'footer'],
        default: 'website',
      },
      ipAddress: String,
      userAgent: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster lookups
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscribed: 1 });

// Static method to subscribe
newsletterSchema.statics.subscribe = async function(email, metadata = {}) {
  try {
    const existing = await this.findOne({ email });
    
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        existing.unsubscribedAt = null;
        existing.metadata = { ...existing.metadata, ...metadata };
        await existing.save();
      }
      return existing;
    }
    
    const subscriber = await this.create({
      email,
      metadata,
    });
    
    return subscriber;
  } catch (error) {
    throw error;
  }
};

// Static method to unsubscribe
newsletterSchema.statics.unsubscribe = async function(email) {
  const subscriber = await this.findOne({ email });
  
  if (subscriber) {
    subscriber.subscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();
  }
  
  return subscriber;
};

// Static method to get all subscribers
newsletterSchema.statics.getSubscribers = async function() {
  return this.find({ subscribed: true }).select('email createdAt');
};

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;

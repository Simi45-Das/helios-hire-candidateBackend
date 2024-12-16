exports.saveSocialmedialinks= async ({linkedIn_link,
    github_link,
    youtube_link,
    instagram_link,
    facebook_link,
    otherPlatform_link,})=>{
    try{
        let socialMediaLinks = await SocialMediaLink.findOne({ user: userId });

        if (socialMediaLinks) {
          // Update existing record
          socialMediaLinks.linkedIn_link = linkedIn_link || socialMediaLinks.linkedIn_link;
          socialMediaLinks.github_link = github_link || socialMediaLinks.github_link;
          socialMediaLinks.youtube_link = youtube_link || socialMediaLinks.youtube_link;
          socialMediaLinks.instagram_link = instagram_link || socialMediaLinks.instagram_link;
          socialMediaLinks.facebook_link = facebook_link || socialMediaLinks.facebook_link;
          socialMediaLinks.otherPlatform_link = otherPlatform_link || socialMediaLinks.otherPlatform_link;
        } else {
          // Create new record
          socialMediaLinks = new SocialMediaLink({
            userId: userId,
            linkedIn_link,
            github_link,
            youtube_link,
            instagram_link,
            facebook_link,
            otherPlatform_link,
          });
        }
    
        await socialMediaLinks.save(); 
    }catch(err){
            throw err;
    }
}

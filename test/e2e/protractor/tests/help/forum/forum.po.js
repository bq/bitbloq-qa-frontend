'use strict';
var Forum = function() {
    //header
    this.newTopicButton = $('[data-element="forum-new-topic-button"]');
    this.categoryButton = $('[data-element="forum-category-button"]');

    //new topic
    this.categoryList = $('[data-element="forum_category_dropdown"]');
    this.newTopicTitle=$('[data-element="forum-new-theme-title"]');
    this.newTopicDescription=$('[data-element="forum-new-theme-description"]');
    this.forumScroll='$(\'[data-element="forum-scroll"]\')';
    this.publishTopic=$('[data-element="forum-publish-theme"]');

    this.url = '#/help/forum';

    this.get = function() {
        browser.get(this.url);
    };

};
module.exports = Forum;

function skillsMember() {
  // A private function
  function learnSkill(skill) {
    console.log('I am learning ' + skill);
  }

  // A public function
  this.learn = function(skill) {
    learnSkill(skill);
  }
}
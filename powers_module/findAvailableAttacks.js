module.exports = function (state) {
  var energyAvailable = state.PlayerMap.Owner.Energy;
  var powers = [
     { WeaponType: 'SingleShot', EnergyRequired: 1 }
  ];
  state.PlayerMap.Owner.Ships.forEach((ship)=>{
    if (ship.Placed && !ship.Destroyed) {
      ship.Weapons.forEach((weapon)=>{
        if (weapon.WeaponType != 'SingleShot' && weapon.EnergyRequired <= energyAvailable) {
          powers.push(weapon);
        }
      });
    }
   });
   return powers;
}

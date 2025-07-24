exports.calculatePlanCost = (plan, selectedAddons = []) => {
  let total = plan.price;

  if (Array.isArray(selectedAddons) && plan.addons?.length > 0) {
    for (const addon of plan.addons) {
      if (selectedAddons.includes(addon.name)) {
        total += addon.price;
      }
    }
  }

  return total;
};

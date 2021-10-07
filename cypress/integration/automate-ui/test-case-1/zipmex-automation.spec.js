context("zipmex Web UI", () => {
  it("buy USDTUSD", () => {
    const url = "https://trade.zipmex.com/global/trade";

    cy.visit(url);

    cy.wait(2000).then(() => {
      // search & assign variable
      cy.get(".MuiInputBase-input", { timeout: 50000 })
        .type("usdt", { timeout: 10000 }) // type search
        .then(() => {
          cy.get(".instrument-selector-popup__instrument-info")
            .should("be.visible")
            .click()
            .then(() => {
              cy.get(
                ":nth-child(1) > :nth-child(1) > .form-group.order-entry__limit-price > .ap-input__input-box > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input",
                {
                  timeout: 10000,
                }
              )
                .should("be.visible")
                .as("price");
              cy.get(
                ":nth-child(1) > :nth-child(1) > :nth-child(2) > .ap-input__input-box > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input",
                {
                  timeout: 10000,
                }
              )
                .should("be.visible")
                .as("amount");

              cy.get(
                ":nth-child(1) > :nth-child(1) > :nth-child(4) > .ap-input__input-box > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input",
                {
                  timeout: 10000,
                }
              )
                .should("be.visible")
                .as("total");
            });
        });

      let newPrice = 0;
      cy.get("@price")
        .invoke("val")
        .then((price) => {
          // price = '1.0014'
          const originalPrice = parseFloat(price); //convert string to float
          newPrice = originalPrice + (originalPrice * 0.1) / 100; // price + (price * 0.1%)
          newPrice = newPrice.toFixed(4);
        })
        .then(() => {
          cy.get("@price").clear().type(newPrice);
        })
        .then(() => {
          cy.get("@amount").clear().type("1.00");
        })
        .then(() => {
          cy.get("@total")
            .invoke("val")
            .then((total) => {
              cy.log(total);
              cy.writeFile(
                "output/Test Result-Buy.md",
                [
                  "Trade USDTUSD",
                  "with side = buy",
                  `with price = ${newPrice}`,
                  "with amount = 1.00",
                  `Total (USD) = ${total}`,
                ].join("\n")
              );
            });
        });
    });
  });
});

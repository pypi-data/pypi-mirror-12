$(document).ready(function () {
    $('#n-slider').slider({
        'min': 2,
        'max': 50,
        'slide': function(event, ui) {
            $('#n-display').text(ui.value);
            constrain_t(ui.value);
            recalculate(true);
        },
        'change': function(event, ui) {
            $('#n-display').text(ui.value);
        },
    });
    n_value(7);

    $('#t-slider').slider({
        'min': 2,
        'max': 50,
        'slide': function(event, ui) {
            if (ui.value > n_value()) {
                event.preventDefault();
            } else {
                $('#t-display').text(ui.value);
                recalculate(true);
            }
        },
        'change': function(event, ui) {
            $('#t-display').text(ui.value);
        },
    });
    t_value(4);

    $('#p_d').spinner({
        'min': 0,
        'max': 100,
        'numberFormat': 'n',
        'spin': function (event, ui) { recalculate(true); },
        'change': function (event, ui) { recalculate(true); },
    });
    $('#p_l').spinner({
        'min': 0,
        'max': 100,
        'numberFormat': 'n',
        'spin': function (event, ui) { recalculate(true); },
        'change': function (event, ui) { recalculate(true); },
    });
    $('#p_d').spinner('value', 5);
    $('#p_l').spinner('value', 5);
});


function constrain_t(n)
{
    if (t_value() > n) {
        t_value(n);
    }
}


function recalculate(delay)
{
    if (delay) {
        setTimeout(function () {recalculate(false);}, 1);
    } else {
        p_disc = prob_disclosure(n_value(), t_value(), pd_value() / 100.0) * 100.0
        p_loss = prob_loss(n_value(), t_value(), pl_value() / 100.0) * 100.0

        $('#p_disc').text(Math.round(p_disc * 10000000000) / 10000000000);
        $('#p_loss').text(Math.round(p_loss * 10000000000) / 10000000000);
    }
}


function n_value(value)
{
    if (value == null) {
        return $('#n-slider').slider('option', 'value');
    } else {
        return $('#n-slider').slider('option', 'value', value);
    }
}


function t_value(value)
{
    if (value == null) {
        return $('#t-slider').slider('option', 'value');
    } else {
        return $('#t-slider').slider('option', 'value', value);
    }
}


function pd_value()
{
    return $('#p_d').spinner('value');
}


function pl_value()
{
    return $('#p_l').spinner('value');
}


function prob_disclosure(n, t, p)
{
    if (n >= 1 && t >= 1 && n >= t) {
        return (1 - Math.pow(1 - Math.pow(p, t), binom(n, t)));
    } else {
        return NaN;
    }
}


function prob_loss(n, t, p)
{
    return prob_disclosure(n, n - t + 1, p);
}


function binom(n, k)
{
    if (n > 0 && k > 0 && n >= k) {
        return fact(n)/(fact(k) * fact(n - k));
    } else {
        return NaN;
    }
}


function fact(n)
{
    var f = 1;

    for (var i = 2; i <= n; i++) {
        f *= i;
    }

    return f;
}
